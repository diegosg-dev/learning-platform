"use client";

import Link from "next/link";
import { useState } from "react";
import { Award, Clock, Download, ListChecks } from "lucide-react";
import { Note } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/progress-provider";
import {
  DATA_SLUG,
  buildSyllabusText,
  getProgramme,
  moduleStatuses,
  nextLessonId,
  outlineFor,
  programmeRatio,
} from "@/lib/content";
import { lessonPath } from "@/lib/lessons";
import { cn } from "@/lib/utils";

export function ProgrammeView({ slug }: { slug: string }) {
  const programme = getProgramme(slug);
  const { state, joinWaitlist } = useProgress();
  const [open, setOpen] = useState("m3");
  if (!programme) return null;
  const isData = programme.slug === DATA_SLUG;
  const ratio = programmeRatio(state.completedLessons);
  const percent = isData ? Math.round(ratio.ratio * 100) : 0;
  const next = nextLessonId(state.completedLessons);
  const statuses = isData ? moduleStatuses(state.completedLessons) : [];
  const waiting = state.waitlist.includes(programme.slug);

  function download() {
    const blob = new Blob([buildSyllabusText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "syllabus-data-analyst.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-6 sm:px-8 sm:py-8">
      <section className="rounded-panel bg-navy p-6 text-white sm:p-8">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-white/10 px-2.5 py-1">{programme.short}</span>
          <span className="rounded-full bg-[#fff4d4] px-2.5 py-1 text-gold-ink">
            {programme.level === "Débutant" ? "Débutant → Intermédiaire" : programme.level}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {isData ? "Programme Data Analyst" : programme.name}
        </h1>
        <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-white/75 sm:text-base">{programme.summary}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Mini icon={<Clock className="size-4" />} value={`~${programme.hours}\u00a0h`} label="Durée estimée" />
          <Mini icon={<ListChecks className="size-4" />} value={`${programme.modulesCount} modules`} label={isData ? "52 leçons" : "Découpage à l’ouverture"} />
          <Mini icon={<Award className="size-4" />} value={isData ? "150+" : "—"} label={isData ? "Exercices interactifs" : "Exercices à venir"} />
          <Mini icon={<Award className="size-4" />} value="1 certificat" label="Examen surveillé" />
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {isData && next ? (
            <Button variant="gold" size="pill" render={<Link href={lessonPath(next)} />}>
              Reprendre le programme
            </Button>
          ) : null}
          {isData ? (
            <Button variant="inverse" size="pill" onClick={download}>
              <Download className="size-4" /> Télécharger le syllabus
            </Button>
          ) : (
            <Button variant="gold" size="pill" onClick={() => joinWaitlist(programme.slug)}>
              {waiting ? "Tu es sur la liste" : "Me prévenir à l’ouverture"}
            </Button>
          )}
          {isData ? (
            <Button variant="inverse" size="pill" render={<Link href={`/programmes/${slug}/syllabus`} />}>
              Lire le syllabus
            </Button>
          ) : null}
        </div>
      </section>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.7fr)]">
        <section className="rounded-panel border border-line bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Contenu du programme</h2>
            {isData ? <span className="text-sm font-semibold text-blue">Progression&nbsp;: {percent}&nbsp;%</span> : null}
          </div>
          {isData ? (
            <ul className="mt-2">
              {statuses.map((item) => {
                const expanded = open === item.module.id;
                return (
                  <li key={item.module.id} className="border-b border-line last:border-0">
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 py-3 text-left"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? "" : item.module.id)}
                    >
                      <span className="grid size-8 place-items-center rounded-full bg-paper text-sm font-semibold">
                        {item.module.index}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{item.module.title}</span>
                        <span className="block text-sm text-ink-soft">{item.module.blurb}</span>
                      </span>
                      <span className="hidden text-sm text-ink-soft sm:inline">{item.module.hours}&nbsp;h</span>
                      <ModulePill status={item.status} />
                    </button>
                    {expanded ? (
                      <ul className="mb-3 ml-11 space-y-1">
                        {item.lessons.map((lesson) => {
                          const done = state.completedLessons.includes(lesson.id);
                          return (
                            <li key={lesson.id}>
                              <Link
                                href={lessonPath(lesson.id)}
                                className="flex items-baseline justify-between gap-3 rounded-xl px-2 py-2 hover:bg-paper"
                              >
                                <span>
                                  <span className="font-medium">{lesson.id} · {lesson.title}</span>
                                  <span className="mt-0.5 block text-sm text-ink-soft">{lesson.summary}</span>
                                </span>
                                <span className="shrink-0 text-xs text-ink-soft">{done ? "Terminé" : `${lesson.minutes} min`}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="mt-4 space-y-3">
              {outlineFor(programme.slug).map((item, index) => (
                <li key={item.title} className="rounded-2xl border border-line px-4 py-3">
                  <p className="text-xs font-semibold text-ink-soft">Aperçu {index + 1}</p>
                  <p className="mt-1 font-medium">{item.title}</p>
                  <p className="text-sm text-ink-soft">{item.blurb}</p>
                </li>
              ))}
              <li className="text-sm text-ink-soft">Le découpage complet sera publié à l’ouverture. Volumes indicatifs.</li>
            </ul>
          )}
        </section>

        <div className="flex flex-col gap-4">
          <section className="rounded-panel border border-line bg-white p-5">
            <Award className="size-5 text-blue" />
            <h2 className="mt-3 text-lg font-semibold">Certification {programme.certificate}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Obtenue après le projet final et un examen en ligne surveillé (QCM + exercices de code).
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Examen de 90&nbsp;min, caméra activée</li>
              <li>Note minimale&nbsp;: 70/100</li>
              <li>Certificat vérifiable par lien unique</li>
            </ul>
            <p className="mt-4 rounded-2xl bg-orange-soft px-3 py-2 text-sm text-orange">
              Objectif à terme&nbsp;: reconnaissance RNCP. Aucune accréditation à ce stade.
            </p>
            {isData ? (
              <Button variant="navy" size="pill" className="mt-4" render={<Link href="/examen" />}>
                Voir l’examen
              </Button>
            ) : null}
          </section>
          <section className="rounded-panel border border-line bg-white p-5">
            <h2 className="font-semibold">Compétences visées</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {programme.skills.map((skill) => (
                <li key={skill} className="rounded-full border border-line px-2.5 py-1 text-xs font-medium">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <div className="mt-4">
        <Note>Durées et volumes donnés à titre d’exemple</Note>
      </div>
    </div>
  );
}

function Mini({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
      <div className="flex items-center gap-2 text-white/70">{icon}<span className="text-xs">{label}</span></div>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function ModulePill({ status }: { status: "done" | "current" | "upcoming" }) {
  if (status === "done") return <span className={cn("rounded-full bg-green-soft px-2 py-1 text-xs font-semibold text-green-ink")}>Terminé</span>;
  if (status === "current") return <span className="rounded-full bg-blue-soft px-2 py-1 text-xs font-semibold text-blue">En cours</span>;
  return <span className="text-xs font-semibold text-orange">À venir</span>;
}
