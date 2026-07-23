# 🪦 Tombstone — Dead Code & Asset Bloat Hunter

> **Entry-Point Reachability Graph Analysis to Isolate Unreachable Symbols, Unused Exports, Orphaned Dependencies, and Legacy Assets.**

Inspired by [Knip](https://github.com/webpro-nl/knip), [Vulture](https://github.com/jendrikseipp/vulture), and Go [`deadcode`](https://go.googlesource.com/tools/+/refs/heads/master/cmd/deadcode/).

---

## 📌 Problem Statement

Over time, large codebases accumulate dead code, unreferenced module exports, orphaned package dependencies, and deprecated binary assets. This bloat slows down builds, increases bundle size, and confuses developers and AI tools.

## 💡 Solution

Tombstone implements **Root Entry-Point Reachability Analysis**:
1. Traverses the symbol call-graph starting from explicitly declared entry points (`main.go`, `index.ts`, API route handlers).
2. Cross-references exported declarations against workspace-wide import call sites.
3. Flags symbols with zero reachability paths ($Reachability = 0$) as candidates for safe pruning.

---

## 🎯 Key Features

- 🎯 **Root-to-Leaf Reachability**: Traverses workspace dependency graphs from declared entry points.
- 📦 **Unused Export & Package Detection**: Identifies dead functions, unread variables, and orphaned `npm`/`cargo` packages.
- 🧹 **Legacy File Detection**: Flags temporary, backup, or deprecated files (`.tmp`, `.bak`, `.old`).
- ⚡ **BLAKE3 Content-Hashed Caching**: Uses symbol signature caching to avoid full re-analyses on unmodified files.

---

## 🚀 Installation & Usage

### Prerequisites
- Node.js >= 18.0.0

### Run Pruning Audit
```bash
# Audit workspace for dead code and bloat
node lib/tombstone.js --dir "/path/to/repo"
```

### CLI Options
- `--dir <path>`: Target workspace directory to audit (default: `.`).

---

## 📄 Output Artifacts

Tombstone produces `tombstone-pruning-report.md` containing:
1. **Unreachable Code & Dead Exports**: List of unused symbols and unreferenced files.
2. **Orphaned Asset Candidates**: Deprecated binary blobs and backup files.
3. **Estimated Byte Savings**: Summary of potential bundle size reduction.

---

## 📄 License

MIT © [G10DC](https://github.com/G10DC)
