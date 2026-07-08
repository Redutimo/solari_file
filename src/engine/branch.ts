import type { BranchPointDef, DecisionRecord, StrategyState, StateVar } from "./types";

/**
 * Evaluate a branch point against current strategy state.
 * Returns the variant plus a plain-language account of which prior
 * decisions moved the variables that fired the rule.
 */
export function resolveBranch(
  def: BranchPointDef,
  strategy: StrategyState,
  decisions: DecisionRecord[]
) {
  const rule = def.rules.find((r) => r.test(strategy)) ?? def.rules[def.rules.length - 1];
  const variant = def.variants[rule.variantId];

  // Attribute the branch to prior decisions: for each state variable the fired
  // rule declares as a driver, find the decisions with the largest absolute
  // deltas on that variable.
  const totals: Partial<Record<StateVar, { sum: number; contributors: Map<number, number> }>> = {};
  for (const d of decisions) {
    for (const [k, delta] of Object.entries(d.stateDeltas)) {
      const key = k as StateVar;
      if (!delta || !rule.drivers.includes(key)) continue;
      const t = (totals[key] ??= { sum: 0, contributors: new Map() });
      t.sum += delta;
      t.contributors.set(d.chapterId, (t.contributors.get(d.chapterId) ?? 0) + Math.abs(delta));
    }
  }

  const contributors: string[] = [];
  const seen = new Set<string>();
  for (const key of Object.keys(totals) as StateVar[]) {
    const t = totals[key]!;
    const ranked = [...t.contributors.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
    for (const [chapterId] of ranked) {
      const rec = decisions.find((d) => d.chapterId === chapterId);
      if (!rec) continue;
      const line = `Week ${chapterId}: “${rec.classificationName}”`;
      if (!seen.has(line)) {
        seen.add(line);
        contributors.push(line);
      }
    }
  }

  return { rule, variant, contributors };
}
