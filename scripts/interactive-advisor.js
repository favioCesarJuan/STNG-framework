#!/usr/bin/env node
/**
 * ==============================================================================
 * 🛸 STNG-FRAMEWORK: LIFECYCLE-AWARE INTERACTIVE ADVISOR
 * ==============================================================================
 * Advises the user on appropriate tools, testing frameworks, linters, and
 * architecture according to the project's exact lifecycle stage:
 *   - Greenfield (Proyecto Nuevo / Desde Cero)
 *   - In-Construction (En Construcción / Desarrollo Activo)
 *   - Maintenance (Mantenimiento / Legacy / Producción)
 *
 * Persists the resulting tactical configuration into:
 *   .agents/project-profile.json
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import process from 'node:process';
import { execSync } from 'node:child_process';

export const PROJECT_LIFECYCLE = {
  GREENFIELD: 'greenfield',
  IN_CONSTRUCTION: 'construction',
  MAINTENANCE: 'maintenance'
};

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  gold: '\x1b[38;5;220m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

function promptUser(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans.trim());
  }));
}

/**
 * Heuristically inspects a directory to determine project maturity and archetype
 */
export function detectProjectLifecycle(targetDir = process.cwd()) {
  const resolved = path.resolve(targetDir);
  const exists = (rel) => fs.existsSync(path.join(resolved, rel));

  const hasPkg = exists('package.json');
  const hasPy = exists('pyproject.toml') || exists('requirements.txt');
  const hasGo = exists('go.mod');
  const hasRust = exists('Cargo.toml');
  const hasGit = exists('.git');

  let commitCount = 0;
  if (hasGit) {
    try {
      commitCount = parseInt(execSync('git rev-list --count HEAD 2>/dev/null', { cwd: resolved, encoding: 'utf-8' }).trim(), 10) || 0;
    } catch {}
  }

  // Count files in root
  let rootFiles = [];
  try {
    rootFiles = fs.readdirSync(resolved).filter(f => !f.startsWith('.git') && f !== 'node_modules');
  } catch {}

  let inferredStage = PROJECT_LIFECYCLE.IN_CONSTRUCTION;
  if (rootFiles.length <= 3 && commitCount <= 2) {
    inferredStage = PROJECT_LIFECYCLE.GREENFIELD;
  } else if (commitCount > 50 || exists('CHANGELOG.md') || exists('dist') || exists('release.config.js')) {
    inferredStage = PROJECT_LIFECYCLE.MAINTENANCE;
  }

  // Detect gaps
  const hasTests = exists('test') || exists('tests') || exists('__tests__') || exists('vitest.config.ts') || exists('jest.config.js');
  const hasLinter = exists('eslint.config.js') || exists('.eslintrc.json') || exists('biome.json') || exists('ruff.toml');
  const hasMcp = exists('.mcp/mcp-servers.config.json');
  const hasCrew = exists('.agents/crew');
  const hasSemgrep = exists('.agents/rules/semgrep-starfleet.yml') || exists('.semgrep.yml');
  const hasGitHooks = exists('.git/hooks/pre-commit');

  return {
    inferredStage,
    commitCount,
    hasPkg,
    hasPy,
    hasGo,
    hasRust,
    hasGit,
    gaps: {
      hasTests,
      hasLinter,
      hasMcp,
      hasCrew,
      hasSemgrep,
      hasGitHooks
    }
  };
}

/**
 * Returns tailored recommendations based on lifecycle stage and detected gaps
 */
export function generateRecommendations(stage, gaps) {
  const recommendations = [];

  if (stage === PROJECT_LIFECYCLE.GREENFIELD) {
    recommendations.push({
      category: 'Arquitectura & Estructura',
      title: 'Definir Arquitectura Modular Limpia desde el Día 1',
      details: 'Organiza el código en src/ con separación de capas (domain, application, infrastructure). Evita el acoplamiento temprano.'
    });
    recommendations.push({
      category: 'Tipado & Calidad',
      title: 'Biome o TypeScript Strict + ESLint',
      details: 'Establece reglas de linting y formateo automáticas antes de escribir la primera línea de negocio.'
    });
    recommendations.push({
      category: 'Testing',
      title: 'Suite de Pruebas Nativa (Node.js test runner o Vitest)',
      details: 'Crea la estructura de test/ con tests unitarios continuos y zero-dependency runtime.'
    });
  } else if (stage === PROJECT_LIFECYCLE.IN_CONSTRUCTION) {
    recommendations.push({
      category: 'Desarrollo Activo',
      title: 'Blindaje de Flujo de Trabajo (Git Pre-Commit Hook)',
      details: 'Activa scripts/pre-commit.sh para validar Semgrep, Worf Shield y linters en cada commit sin ralentizar el flujo.'
    });
    if (!gaps.hasTests) {
      recommendations.push({
        category: 'Testing',
        title: 'Agregar Test Runner Urgente',
        details: 'El proyecto está en desarrollo sin suite de tests detectada. Se recomienda agregar pruebas antes de expandir funcionalidades.'
      });
    }
    if (!gaps.hasMcp) {
      recommendations.push({
        category: 'Herramientas de IA (MCP)',
        title: 'Configurar Tríada Indispensable MCP',
        details: 'Instala Context7 (docs actualizadas), Codebase Memory (grafo Cypher) y GitHub MCP para potenciar a los agentes.'
      });
    }
  } else {
    // MAINTENANCE
    recommendations.push({
      category: 'Seguridad & Regresiones',
      title: 'Políticas Estrictas de Semgrep & Worf Shield',
      details: 'Foco en estabilidad. Bloquea comandos destructivos y analiza dependencias con node-audit y SkillSpector para prevenir CVEs.'
    });
    recommendations.push({
      category: 'Mantenibilidad',
      title: 'Preservación de Capas y Compatibilidad hacia Atrás',
      details: 'Aplica el Protocolo Cola de Caballo (Ponytail): no introducir dependencias pesadas innecesarias y aislar refactors.'
    });
    if (!gaps.hasSemgrep) {
      recommendations.push({
        category: 'Auditoría SAST',
        title: 'Activar Reglas Semgrep Starfleet',
        details: 'Audita contra antipatrones de polling continuo, inyecciones de comandos y fugas de tokens.'
      });
    }
  }

  return recommendations;
}

/**
 * Saves project profile to .agents/project-profile.json
 */
export function saveProjectProfile(targetDir, profile) {
  const agentsDir = path.join(targetDir, '.agents');
  if (!fs.existsSync(agentsDir)) {
    fs.mkdirSync(agentsDir, { recursive: true });
  }
  const outFile = path.join(agentsDir, 'project-profile.json');
  fs.writeFileSync(outFile, JSON.stringify(profile, null, 2), 'utf-8');
  return outFile;
}

/**
 * Runs the interactive or automatic advisor
 */
export async function runLifecycleAdvisor(targetDir = process.cwd(), options = {}) {
  const resolved = path.resolve(targetDir);
  console.log(`\n${c.gold}==============================================================================${c.reset}`);
  console.log(`${c.bold}🛸 STNG-FRAMEWORK: ASESOR TÁCTICO DE CICLO DE VIDA (CONSEJO DE OFICIALES)${c.reset}`);
  console.log(`${c.gold}==============================================================================${c.reset}\n`);

  const detection = detectProjectLifecycle(resolved);
  console.log(`${c.bold}Proyecto inspeccionado:${c.reset} ${c.cyan}${resolved}${c.reset}`);
  console.log(`- Commits detectados: ${c.bold}${detection.commitCount}${c.reset}`);
  console.log(`- Etapa sugerida por sensores: ${c.green}${detection.inferredStage.toUpperCase()}${c.reset}\n`);

  let chosenStage = detection.inferredStage;

  if (!options.yes && process.stdin.isTTY) {
    console.log(`${c.bold}¿En qué etapa del ciclo de vida se encuentra el proyecto?${c.reset}`);
    console.log(`1) Greenfield (Nuevo / Desde cero)`);
    console.log(`2) In-Construction (En construcción / Desarrollo activo)`);
    console.log(`3) Maintenance (Mantenimiento / Estable / Legacy)`);
    const ans = await promptUser(`Selecciona [1-3, defecto=${chosenStage === 'greenfield' ? 1 : chosenStage === 'construction' ? 2 : 3}]: `);
    if (ans === '1') chosenStage = PROJECT_LIFECYCLE.GREENFIELD;
    else if (ans === '2') chosenStage = PROJECT_LIFECYCLE.IN_CONSTRUCTION;
    else if (ans === '3') chosenStage = PROJECT_LIFECYCLE.MAINTENANCE;
  }

  console.log(`\n${c.bold}Generando diagnóstico táctico para etapa:${c.reset} ${c.gold}${chosenStage.toUpperCase()}${c.reset}...\n`);
  const recommendations = generateRecommendations(chosenStage, detection.gaps);

  console.log(`${c.bold}📊 DIAGNÓSTICO DE BRECHAS Y RECOMENDACIONES DE LA TRIPULACIÓN:${c.reset}`);
  recommendations.forEach((rec, idx) => {
    console.log(`\n${c.gold}[${idx + 1}] ${rec.category}: ${c.bold}${rec.title}${c.reset}`);
    console.log(`    ${rec.details}`);
  });

  const profile = {
    evaluatedAt: new Date().toISOString(),
    lifecycleStage: chosenStage,
    targetDir: resolved,
    metrics: {
      commitCount: detection.commitCount,
      gaps: detection.gaps
    },
    recommendations
  };

  const savedPath = saveProjectProfile(resolved, profile);
  console.log(`\n${c.green}✔ Perfil de ciclo de vida guardado en:${c.reset} ${c.cyan}${savedPath}${c.reset}\n`);
  return profile;
}

// Direct invocation check
if (process.argv[1] && process.argv[1].endsWith('interactive-advisor.js')) {
  const autoYes = process.argv.includes('--yes') || process.argv.includes('-y');
  runLifecycleAdvisor(process.cwd(), { yes: autoYes });
}
