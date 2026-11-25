"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Atom, Clock, Code2, Compass, Landmark, MessagesSquare, Search, Table2 } from "lucide-react";
import { useProgress } from "@/components/progress-provider";
import { programmes } from "@/lib/content";
import { frNum } from "@/lib/format";
import type { Programme, ProgrammeIcon } from "@/lib/lesson-types";
import { cn } from "@/lib/utils";

const icons: Record<ProgrammeIcon, typeof Table2> = {
  data: Table2,
  code: Code2,
  business: Compass,
  finance: Landmark,
  leadership: MessagesSquare,
  science: Atom,
};

const filters = [
  { id: "tous", label: "Tous" },
  { id: "data", label: "Data & IA" },
  { id: "code", label: "Code" },
  { id: "business", label: "Business" },
  { id: "finance", label: "Finance" },
  { id: "leadership", label: "Leadership" },
  { id: "science", label: "Sciences" },
];

export function CatalogueView() {
  const { state } = useProgress();
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("tous");
  const [level, setLevel] = useState("tous");
  const [duration, setDuration] = useState("toutes");
  const [certifiedOnly, setCertifiedOnly] = useState(true);

  const results = useMemo(() => {
    return programmes.filter((programme) => {
      if (family !== "tous" && programme.icon !== family) return false;
      if (level !== "tous" && programme.level !== level) return false;
      if (duration === "court" && programme.hours >= 70) return false;
      if (duration === "long" && programme.hours < 70) return false;
      if (certifiedOnly && !programme.certificate) return false;
      const haystack = `${programme.name} ${programme.pitch} ${programme.skills.join(" ")}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    });
  }, [certifiedOnly, duration, family, level, query]);

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Catalogue des programmes</h1>
          <p className="mt-2 text-ink-soft">6 parcours complets, du niveau débutant à avancé, avec certification finale.</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#fff4d4] px-3 py-1.5 text-sm font-semibold text-gold-ink">
          {frNum(state.xp)} XP
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="flex h-11 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4">
          <Search className="size-4 text-ink-soft" />
          <span className="sr-only">Rechercher</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un programme, une compétence"
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink-soft/70"
          />
        </label>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setFamily(filter.id)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium",
              family === filter.id ? "bg-navy text-white" : "bg-white text-navy border border-line",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
        <label>
          Niveau
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            className="ml-2 rounded-full border border-line bg-white px-3 py-1.5 text-navy"
          >
            <option value="tous">tous</option>
            <option value="Débutant">débutant</option>
            <option value="Intermédiaire">intermédiaire</option>
            <option value="Avancé">avancé</option>
          </select>
        </label>
        <label>
          Durée
          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="ml-2 rounded-full border border-line bg-white px-3 py-1.5 text-navy"
          >
            <option value="toutes">toutes</option>
            <option value="court">moins de 70 h</option>
            <option value="long">70 h et plus</option>
          </select>
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={certifiedOnly}
            onChange={(event) => setCertifiedOnly(event.target.checked)}
          />
          Avec certification
        </label>
        <span className="ml-auto">{results.length} programme{results.length > 1 ? "s" : ""}</span>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 rounded-panel border border-dashed border-line bg-white px-6 py-12 text-center">
          <p className="text-lg font-semibold">Aucun programme ne correspond.</p>
          <p className="mt-2 text-sm text-ink-soft">Élargis la recherche, ou reviens à «&nbsp;Tous&nbsp;».</p>
          <button type="button" className="mt-4 text-sm font-semibold text-blue" onClick={() => { setQuery(""); setFamily("tous"); setLevel("tous"); setDuration("toutes"); }}>
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((programme) => (
            <ProgrammeCard key={programme.slug} programme={programme} />
          ))}
        </div>
      )}
      <p className="mt-8 rounded-2xl bg-blue-soft px-4 py-3 text-sm text-navy">
        Chaque programme se termine par un examen surveillé et un certificat. Durées indicatives, à titre d’exemple.
      </p>
    </div>
  );
}

export function ProgrammeCard({ programme }: { programme: Programme }) {
  const Icon = icons[programme.icon];
  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className="flex h-full flex-col rounded-card border border-line bg-white p-5 transition hover:border-blue/30"
    >
      <span className="grid size-11 place-items-center rounded-2xl bg-blue-soft text-blue">
        <Icon className="size-5" />
      </span>
      <h2 className="mt-5 text-xl font-semibold">{programme.name}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{programme.pitch}</p>
      <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-soft">
        <Clock className="size-4" />
        {programme.modulesCount} modules · ~{programme.hours}&nbsp;h
      </p>
      <span
        className={cn(
          "mt-3 w-fit rounded-full px-2.5 py-1 text-xs font-semibold",
          programme.available ? "bg-blue-soft text-blue" : "bg-paper text-ink-soft",
        )}
      >
        {programme.available ? "Disponible" : "Bientôt"}
      </span>
    </Link>
  );
}
