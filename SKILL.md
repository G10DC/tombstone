---
name: tombstone
status: stub
description: >-
  Pure BFS reachability filter over a caller-supplied { symbols, entryPoints,
  edges } graph -- returns symbols unreachable from the given entry points.
  Builds no graph itself: reads no filesystem, runs no parser, calls no other
  skill. Use only if you already have that graph structure in hand and need it
  filtered. Never rebuild the reachability graph -- consume trellis output; never
  delete candidates without independent verification.
---

# Tombstone

**BFS reachability filter over a graph the caller provides.** Does not build a graph, read the filesystem, or call `trellis` or any other skill. Given `{ symbols, entryPoints, edges }`, runs breadth-first reachability from `entryPoints` and returns every symbol never reached.

## What it actually does
Takes `{ symbols, entryPoints, edges }` as a plain object; fixed-point BFS from `entryPoints`
following `edges` (`{ from, to }`); returns every symbol never reached. That's the whole
implementation — no filesystem, no AST parsing, no subprocess calls.

## The gap that matters
Nothing in this repo, or any sibling skill installed here, produces the `{ symbols, entryPoints,
edges }` structure this expects. `trellis` is documented elsewhere as the intended source, but no
code connects them — no import, no read of a `trellis` output file. Until you build that
structure yourself, this class has no usable input.

## Usage (library, not a CLI)

```js
import { TombstoneHunter } from './lib/tombstone.js';

// You must build this graph yourself -- nothing here produces it.
const graph = { symbols: ['a', 'b', 'c'], entryPoints: ['a'], edges: [{ from: 'a', to: 'b' }] };
const result = new TombstoneHunter().findDeadCodeCandidates(graph);
// result.deadCandidates: ['c']  -- unreachable from entryPoints, NOT verified dead
```

## When to use

- You already have a reachability graph in this shape (built by hand or another tool) and want
  the unreachable-from-entry-points filter applied to it.

## When NOT to use

- **Expecting it to scan a codebase on its own** — it has no graph-building step; build or obtain
  the graph first.
- **About to delete what it returns** — candidates are unverified; check real usage before deleting.
