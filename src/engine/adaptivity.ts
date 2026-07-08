import type { ReflectionQuality } from "./store";

/**
 * v1 soft-adaptivity heuristic — deliberately simple and fully logged.
 * No external grading call: word count + presence of module terminology.
 */
export function gradeReflectionText(text: string, terms: string[]): ReflectionQuality {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const lower = text.toLowerCase();
  const hits = terms.filter((t) => lower.includes(t.toLowerCase())).length;
  if (words >= 40 && hits >= 1) return "strong";
  if (words < 15) return "weak";
  return "middling";
}

/**
 * Look at the last two graded reflections. Two strongs → Bia leaves a stretch
 * question; two weaks → Bia leaves a scaffolding hint. Otherwise nothing.
 */
export function biaMode(
  recent: (ReflectionQuality | undefined)[]
): "stretch" | "hint" | null {
  const graded = recent.filter(Boolean) as ReflectionQuality[];
  if (graded.length < 2) return null;
  const lastTwo = graded.slice(-2);
  if (lastTwo.every((q) => q === "strong")) return "stretch";
  if (lastTwo.every((q) => q === "weak")) return "hint";
  return null;
}
