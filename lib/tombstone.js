/**
 * Tombstone — Dead Code & Asset Bloat Hunter
 */
export class TombstoneHunter {
  /**
   * Isolates unreachable symbols by computing entry point reachability diffs over Trellis graphs.
   */
  findDeadCodeCandidates(trellisIndex = {}) {
    const allSymbols = new Set(trellisIndex.symbols || []);
    const entryPoints = new Set(trellisIndex.entryPoints || []);
    const reachable = new Set(entryPoints);

    const edges = trellisIndex.edges || [];

    // Traverse reachability from entry points
    let grew = true;
    while (grew) {
      grew = false;
      for (const edge of edges) {
        if (reachable.has(edge.from) && !reachable.has(edge.to)) {
          reachable.add(edge.to);
          grew = true;
        }
      }
    }

    const deadCandidates = Array.from(allSymbols).filter(sym => !reachable.has(sym));

    return {
      totalSymbols: allSymbols.size,
      reachableCount: reachable.size,
      deadCandidatesCount: deadCandidates.length,
      deadCandidates,
      honest: 'Candidates are unreferenced symbols from entry points — MUST be verified before deletion.'
    };
  }
}
