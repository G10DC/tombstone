---
name: tombstone
description: Dead Code & Asset Bloat Hunter for large codebases. Builds entry-point reachability graphs to isolate unreachable symbols, unused exports, orphaned dependencies, and deprecated binary assets. Inspired by Knip and Vulture.
---

# 🪦 Tombstone

**Dead Code & Asset Bloat Hunter.** Tombstone audits multi-gigabyte codebases to detect unreachable code paths, unused module exports, orphaned npm/cargo dependencies, and legacy binary assets.

## 🎯 Golden Rules
1. **Entry-Point Root Reachability**: Construct call-graphs starting from declared entry points (`main.go`, `index.ts`, route handlers); symbols with zero reachability path are dead code candidates.
2. **Export-Import Signature Matrix**: Cross-reference all declared module exports against import AST references across the workspace.
3. **Safe Pruning Gate**: Flag dead code as candidate sets for verification via `smith` codemods and `forge` test suites before physical deletion.

## 🏗️ Architecture & Pipeline

```mermaid
graph TD
    A[Workspace Code & Manifests] --> B[Identify Entry Points & Route Handlers]
    B --> C[Traverse AST Symbol Call-Graph]
    C --> D[Identify Reachable Symbol Nodes]
    C --> E[Isolate Unreachable Nodes & Orphaned Assets]
    E --> F[Generate Tombstone Pruning Report]
```

## 🚀 Usage Guide

### 1. Audit Unused Code & Assets
```bash
node C:/Users/GdC/.gemini/config/skills/tombstone/lib/tombstone.js --dir "."
```

### 2. Output
Generates `tombstone-pruning-report.md` containing:
* List of Dead Export Symbols & Unreachable Files
* Orphaned Package Dependencies
* Estimated Byte Savings & Cleanup Script
