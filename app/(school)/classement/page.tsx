"use client";

import { useEffect, useState } from "react";
import { Note } from "@/components/logo";
import { useProgress } from "@/components/progress-provider";
import { frNum } from "@/lib/format";
import { daysUntilMonday, standings } from "@/lib/league";
import { cn } from "@/lib/utils";

const leagues = [
  { name: "Bronze", text: "On y entre. L’habitude compte plus que le score." },
  { name: "Argent", text: "Ta ligue cette semaine. Les cinq premiers montent." },
  { name: "Or", text: "Ceux qui tiennent le rythme sur plusieurs semaines." },
  { name: "Diamant", text: "Peu de places. Pas encore ouverte dans la démo." },
];

export default function ClassementPage() {
  const { state } = useProgress();
  const board = standings(state.weeklyXp, state.learner.firstName);
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(daysUntilMonday()), []);

  return (
    <div className="mx-auto max-w-[800px] px-4 py-8 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">Classement</h1>
      <p className="mt-2 text-ink-soft">
        Ligue Argent
        {days === null ? "" : days === 1 ? " · clôture demain" : ` · ${days} jours avant lundi`}. Les camarades sont fictifs.
      </p>
      <ol className="mt-6 overflow-hidden rounded-panel border border-line bg-white">
        {board.rows.map((row, index) => (
          <li
            key={`${row.name}-${index}`}
            className={cn(
              "flex items-center gap-3 border-b border-line px-4 py-3 last:border-0",
              row.you && "bg-blue-soft",
              index < 5 && "border-l-2 border-l-gold",
            )}
          >
            <span className="w-6 text-sm text-ink-soft">{index + 1}</span>
            <span className="flex-1 font-medium">{row.you ? `${row.name} (toi)` : row.name}</span>
            <span className="text-sm text-ink-soft">{frNum(row.xp)} XP</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-green-ink">
        {board.promoting ? `Tu es ${board.rank}${board.rank === 1 ? "er" : "e"}. Zone de montée.` : `Tu es ${board.rank}e.`}
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {leagues.map((league) => (
          <article key={league.name} className="rounded-card border border-line bg-white p-4">
            <h2 className="font-semibold">Ligue {league.name}</h2>
            <p className="mt-1 text-sm text-ink-soft">{league.text}</p>
          </article>
        ))}
      </div>
      <div className="mt-6">
        <Note>Classement fictif, à titre d’exemple</Note>
      </div>
    </div>
  );
}
