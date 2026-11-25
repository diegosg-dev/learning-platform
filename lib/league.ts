export const RIVALS = [
  { name: "Camille", xp: 1240 },
  { name: "Yanis", xp: 1105 },
  { name: "Léa", xp: 980 },
  { name: "Diego", xp: 860 },
  { name: "Inès", xp: 790 },
  { name: "Adam", xp: 640 },
  { name: "Chloé", xp: 510 },
  { name: "Hugo", xp: 430 },
  { name: "Sara", xp: 305 },
  { name: "Louis", xp: 180 },
] as const;

export type Standing = { name: string; xp: number; you: boolean };

export function standings(weeklyXp: number, firstName: string) {
  const rows: Standing[] = [
    ...RIVALS.map((rival) => ({ name: rival.name, xp: rival.xp, you: false })),
    { name: firstName, xp: weeklyXp, you: true },
  ].sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name, "fr"));
  const rank = rows.findIndex((row) => row.you) + 1;
  return { rows, rank, promoting: rank <= 5 };
}

export function daysUntilMonday(now = new Date()) {
  const delta = (8 - now.getDay()) % 7;
  return delta === 0 ? 7 : delta;
}
