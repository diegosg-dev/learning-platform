export const LEVELS = [
  { level: 1, xp: 0, title: "Curieux" },
  { level: 2, xp: 200, title: "Élève" },
  { level: 3, xp: 500, title: "Praticien" },
  { level: 4, xp: 900, title: "Praticien confirmé" },
  { level: 5, xp: 1400, title: "Analyste" },
  { level: 6, xp: 1900, title: "Analyste" },
  { level: 7, xp: 2400, title: "Analyste junior" },
  { level: 8, xp: 2950, title: "Analyste" },
  { level: 9, xp: 3600, title: "Analyste confirmé" },
  { level: 10, xp: 4400, title: "Référent" },
] as const;

export function levelFor(xp: number) {
  let current: (typeof LEVELS)[number] = LEVELS[0];
  for (const step of LEVELS) {
    if (xp >= step.xp) current = step;
  }
  const next = LEVELS.find((step) => step.xp > xp) ?? null;
  const span = next ? next.xp - current.xp : 1;
  const into = next ? xp - current.xp : 1;
  return {
    level: current.level,
    title: current.title,
    xp: current.xp,
    next,
    ratio: next ? Math.min(1, into / span) : 1,
  };
}
