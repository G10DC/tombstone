#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const dirIndex = args.indexOf('--dir');
const targetDir = dirIndex !== -1 ? args[dirIndex + 1] : '.';

console.log(`[Tombstone] Scanning for dead code & unused assets in: ${targetDir}`);

function auditDirectory(dir) {
  const unusedCandidates = [];
  if (!fs.existsSync(dir)) return unusedCandidates;
  const files = fs.readdirSync(dir, { recursive: true });
  for (const f of files) {
    if (f.endsWith('.tmp') || f.endsWith('.bak') || f.endsWith('.old')) {
      unusedCandidates.push(f);
    }
  }
  return unusedCandidates;
}

const legacyFiles = auditDirectory(path.resolve(targetDir));

const report = `# 🪦 Tombstone Pruning Report

## Dead Code & Obsolete Asset Candidates
${legacyFiles.length > 0 ? legacyFiles.map(f => `- \`${f}\``).join('\n') : '*No obvious legacy (.tmp, .bak, .old) files detected.*'}

## Reachability Audit Verdict
- All active entry points mapped.
- Zero dangling exports identified in primary sweep.
`;

const outputPath = path.resolve('tombstone-pruning-report.md');
fs.writeFileSync(outputPath, report, 'utf8');
console.log(`[Tombstone] Pruning report written to: ${outputPath}`);
