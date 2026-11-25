"use client";

import Link from "next/link";
import { BarChart3, Check, Circle, Flame, Play, Target, Zap } from "lucide-react";
import { Note, initials } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/progress-provider";
import { moduleStatuses, nextLessonId, programmeRatio } from "@/lib/content";
import { dayKey, frNum } from "@/lib/format";
import { getLesson, lessonPath } from "@/lib/lessons";
import { daysUntilMonday, standings } from "@/lib/league";
import { levelFor } from "@/lib/levels";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Dashboard() {
  const { state } = useProgress();
  const level = levelFor(state.xp);
  const ratio = programmeRatio(state.completedLessons);
  const percent = Math.round(ratio.ratio * 100);
  const nextId = nextLessonId(state.completedLessons);
  const next = nextId ? getLesson(nextId) : null;
  const board = standings(state.weeklyXp, state.learner.firstName);
  const statuses = moduleStatuses(state.completedLessons);
  const [days, setDays] = useState<number | null>(null);
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    setDays(daysUntilMonday());
    setToday(dayKey());
  }, []);
  const currentModule = statuses.find((item) => item.status === "current");
  const goal = Math.min(100, Math.round((state.dailyXp / state.dailyGoal) * 100));
  const tasks = [
    { key: "video" as const, label: "Regarder la vidéo du jour", href: next ? lessonPath(next.id) : "/programmes/data-ia" },
    { key: "exercises" as const, label: "Réussir 3 exercices de code", href: next ? lessonPath(next.id) : "/lecons/3-4" },
    { key: "quiz" as const, label: "Faire le quiz rapide", href: "/quiz" },
  ];

  let goalLine = `Encore 1 leçon pour garder ta série de ${state.streak} jours.`;
  if (state.dailyXp >= state.dailyGoal) {
    goalLine = `Objectif atteint. Ta série de ${state.streak} jours est à l’abri pour aujourd’hui.`;
  } else if (state.dailyTasks.quiz) {
    goalLine = `Plus que ${Math.max(state.dailyGoal - state.dailyXp, 0)} XP pour l’objectif du jour.`;
  }

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Bonjour {state.learner.firstName}
          </h1>
          <p className="mt-2 max-w-[46ch] text-ink-soft">
            {state.streak >= 2
              ? `Ta série est en feu\u00a0: ${state.streak} jours d’affilée. Continue comme ça\u00a0!`
              : "Une leçon aujourd’hui, et la série repart."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-soft px-3 py-1.5 text-sm font-semibold text-orange">
            <Flame className="size-4" /> {state.streak}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fff4d4] px-3 py-1.5 text-sm font-semibold text-gold-ink">
            <Zap className="size-4" /> {frNum(state.xp)} XP
          </span>
          <span className="grid size-10 place-items-center rounded-full bg-navy text-sm font-semibold text-gold">
            {initials(state.learner.firstName, state.learner.lastName)}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={<Flame className="size-4" />} tint="bg-orange-soft text-orange" value={`${state.streak} jours`} label="Série en cours" />
        <Stat icon={<Zap className="size-4" />} tint="bg-[#fff4d4] text-gold-ink" value={`${frNum(state.xp)} XP`} label="Expérience totale" />
        <Stat icon={<Target className="size-4" />} tint="bg-blue-soft text-blue" value={`Niveau ${level.level}`} label={level.title} />
        <Stat icon={<BarChart3 className="size-4" />} tint="bg-green-soft text-green-ink" value="Ligue Argent" label={`${board.rank}e cette semaine`} />
      </div>

      <div className="mt-4 grid items-start gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
        <section className="rounded-panel border border-line bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="rounded-full bg-blue-soft px-2.5 py-1 text-xs font-medium text-blue">Programme en cours</span>
            <span className="text-ink-soft">
              Module {currentModule?.module.index ?? 8} sur 8
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">
            Data &amp; IA — {currentModule?.module.title ?? "Parcours terminé"}
          </h2>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-ink-soft">Progression du programme</span>
              <span className="font-semibold">{percent}&nbsp;%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper">
              <div className="h-full rounded-full bg-blue" style={{ width: `${percent}%` }} />
            </div>
          </div>
          {next ? (
            <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-paper p-3 sm:flex-row sm:items-center">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blue text-white">
                <Play className="ml-0.5 size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">Leçon {next.id} · {next.title}</p>
                <p className="text-sm text-ink-soft">
                  {next.minutes} min · +{next.xp} XP
                </p>
              </div>
              <Button variant="navy" size="pill" render={<Link href={lessonPath(next.id)} />}>
                Reprendre la leçon
              </Button>
            </div>
          ) : (
            <Button className="mt-4" variant="navy" size="pill" render={<Link href="/examen" />}>
              Passer à l’examen
            </Button>
          )}

          <h3 className="mt-8 text-lg font-semibold">Tes modules</h3>
          <ul className="mt-3 divide-y divide-line">
            {statuses.map((item) => (
              <li key={item.module.id} className="flex items-center gap-3 py-3">
                <span className="grid size-8 place-items-center rounded-full bg-paper text-sm font-semibold">
                  {item.module.index}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{item.module.title}</p>
                  <p className="text-sm text-ink-soft">
                    {item.total} leçons
                    {item.status === "current" ? ` · ${item.remaining} restantes` : ""}
                  </p>
                </div>
                <span className="hidden text-sm text-ink-soft sm:inline">{item.module.hours}&nbsp;h</span>
                <Status status={item.status} />
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-4">
          <section className="rounded-panel border border-line bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Target className="size-4 text-green-ink" /> Objectif du jour
            </div>
            <p className="mt-3 text-4xl font-semibold tracking-tight">
              {state.dailyXp}
              <span className="text-xl font-medium text-ink-soft">/{state.dailyGoal} XP</span>
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper">
              <div className="h-full rounded-full bg-gold" style={{ width: `${goal}%` }} />
            </div>
            <p className="mt-3 text-sm text-ink-soft">{goalLine}</p>
            <ul className="mt-4 space-y-2">
              {tasks.map((task) => {
                const done = state.dailyTasks[task.key];
                return (
                  <li key={task.key}>
                    <Link href={task.href} className="flex items-center gap-3 text-sm">
                      {done ? (
                        <Check className="size-4 text-green-ink" />
                      ) : (
                        <Circle className="size-4 text-ink-soft" />
                      )}
                      <span className={done ? "text-ink-soft" : "font-medium"}>{task.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-panel border border-line bg-white p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="font-semibold">Ligue Argent · semaine</h3>
              <span className="text-xs text-ink-soft">
                {days === null ? "cette semaine" : days === 1 ? "clôture demain" : `${days} jours avant lundi`}
              </span>
            </div>
            <ol className="mt-3 space-y-1">
              {board.rows.slice(0, 5).map((row, index) => (
                <li
                  key={row.name}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-2 py-2 text-sm",
                    row.you && "bg-blue-soft",
                  )}
                >
                  <span className="w-4 text-ink-soft">{index + 1}</span>
                  <span className="grid size-7 place-items-center rounded-full bg-paper text-[11px] font-semibold">
                    {row.name.slice(0, 1)}
                  </span>
                  <span className="flex-1 font-medium">{row.you ? `${row.name} (toi)` : row.name}</span>
                  <span className="text-ink-soft">{frNum(row.xp)} XP</span>
                </li>
              ))}
            </ol>
            <p className={cn("mt-3 text-sm", board.promoting ? "text-green-ink" : "text-ink-soft")}>
              {board.promoting
                ? "Tu es dans la zone de montée. Les 5 premiers passent en Ligue Or."
                : "Les 5 premiers montent en Ligue Or."}
            </p>
            <Link href="/classement" className="mt-2 inline-block text-sm font-medium text-blue">
              Voir le classement
            </Link>
          </section>

          <section className="rounded-panel border border-line bg-white p-5">
            <h3 className="font-semibold">À revoir</h3>
            <p className="mt-1 text-sm text-ink-soft">Deux gestes déjà vus, pour qu’ils restent.</p>
            <Button variant="outline" className="mt-3 h-10 rounded-full" render={<Link href="/revision" />}>
              {today && state.reviewAwardDay === today ? "Revue faite aujourd’hui" : "Lancer la révision"}
            </Button>
          </section>
        </div>
      </div>

      <div className="mt-6">
        <Note>Données fictives à titre d’exemple</Note>
      </div>
    </div>
  );
}

function Stat({
  icon,
  tint,
  value,
  label,
}: {
  icon: React.ReactNode;
  tint: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-card border border-line bg-white px-4 py-4">
      <span className={cn("grid size-10 place-items-center rounded-full", tint)}>{icon}</span>
      <div>
        <p className="text-xl font-semibold tracking-tight">{value}</p>
        <p className="text-sm text-ink-soft">{label}</p>
      </div>
    </div>
  );
}

function Status({ status }: { status: "done" | "current" | "upcoming" }) {
  if (status === "done") {
    return <span className="rounded-full bg-green-soft px-2.5 py-1 text-xs font-semibold text-green-ink">Terminé</span>;
  }
  if (status === "current") {
    return <span className="rounded-full bg-blue-soft px-2.5 py-1 text-xs font-semibold text-blue">En cours</span>;
  }
  return <span className="text-xs font-semibold text-orange">À venir</span>;
}
