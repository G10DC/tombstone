# Tombstone Dead Code & Asset Bloat Honesty Bounds

The honesty layer is the operational expression of the **G10DC Trellis Standard**: **the processing engine reasons over verified evidence with stated confidence, never hallucinates capabilities or impact.**

## Domain & Scope
**Domain**: Unused Export & Dead Asset Hunting

## Core Epistemic Rules

1. **Reachability Candidate Set: Candidates are potential dead code — MUST be verified by forge and smith before deletion.**
2. **Consumes Trellis Graph: Uses trellis reachability indexes from entry points; does NOT reinvent reachability graphs.**
3. **Confidence Rating: High (0 incoming reachability edges from entry points), Medium (dynamic require candidate), Low (unverified deletion candidate).**

## Three-Tier Confidence Model

- **High Confidence**: Full AST/schema validation passing, deterministic evidence available, verified state.
- **Medium Confidence**: Heuristic analysis or partial indexing; requires agent verification step.
- **Low Confidence**: Inferred or unindexed target; candidate output ONLY, never auto-committed.

## Epistemic Invariant

> Absence of evidence is not evidence of absence. Output is presented as a structured candidate set with confidence scores so caveats cannot be silently dropped downstream.
