import test from 'node:test';
import assert from 'node:assert/strict';
import { TombstoneHunter } from '../lib/tombstone.js';

test('TombstoneHunter isolates unreachable symbols from entry points', () => {
  const hunter = new TombstoneHunter();
  const mockIndex = {
    entryPoints: ['index.js'],
    symbols: ['index.js', 'usedHelper', 'deadUnusedFunction'],
    edges: [{ from: 'index.js', to: 'usedHelper' }]
  };

  const res = hunter.findDeadCodeCandidates(mockIndex);
  assert.equal(res.reachableCount, 2);
  assert.equal(res.deadCandidatesCount, 1);
  assert.equal(res.deadCandidates[0], 'deadUnusedFunction');
});
