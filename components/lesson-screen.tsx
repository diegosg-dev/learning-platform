"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Flame, Pause, Play, X } from "lucide-react";
import { CodeWorkshop } from "@/components/code-workshop";
import { QuizRunner } from "@/components/quiz-runner";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/progress-provider";
import { moduleById } from "@/lib/content";
import { getLesson, lessonPath, lessons } from "@/lib/lessons";
import type { ConceptStep, Step } from "@/lib/lesson-types";
import { cn } from "@/lib/utils";

const labels: Record<Step["type"], string> = {
  concept: "Comprendre",
  quiz: "Question",
  complete: "Geste",
  code: "Script",
};

function Storyboard({ step }: { step: ConceptStep }) {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = step.frames[frame] ?? step.frames[0];

  useEffect(() => {
    if (!playing) return;
    if (frame >= step.frames.length - 1) {
      setPlaying(false);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setTimeout(() => setFrame((value) => value + 1), 4200);
    return () => window.clearTimeout(timer);
  }, [playing, frame, step.frames.length]);

  return (
    <div className="overflow-hidden rounded-panel bg-editor text-white">
      <div className="flex min-h-[240px] flex-col justify-between p-6 sm:min-h-[280px]">
        <div className="flex items-center justify-between text-xs text-white/55">
          <span>Vidéo · {step.minutes} min</span>
          <span>
            {frame + 1}/{step.frames.length}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{current?.title}</h2>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-white/75">{current?.body}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-blue text-white"
            aria-label={playing ? "Pause" : "Lecture"}
            onClick={() => {
              if (!playing && frame >= step.frames.length - 1) {
                setFrame(0);
                setPlaying(true);
                return;
              }
              setPlaying((value) => !value);
            }}
          >
            {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
          </button>
          <button
            type="button"
            className="text-sm text-white/70 hover:text-white"
            onClick={() => setFrame((value) => (value + 1) % step.frames.length)}
          >
            Suivant
          </button>
          <div className="ml-auto h-1.5 w-28 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full bg-green"
              style={{ width: `${((frame + 1) / step.frames.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LessonScreen({ lessonId }: { lessonId: string }) {
  const lesson = getLesson(lessonId);
  const router = useRouter();
  const { state, awardLesson, markDaily, setLessonStep } = useProgress();
  const [index, setIndex] = useState(0);
  const [gesture, setGesture] = useState<string | null>(null);

  if (!lesson) {
    return (
      <div className="grid min-h-dvh place-items-center px-6">
        <p>Cette leçon n’existe pas.</p>
      </div>
    );
  }

  const step = lesson.steps[index];
  const moduleInfo = moduleById(lesson.moduleId);
  const order = lessons.findIndex((item) => item.id === lesson.id);
  const following = lessons[order + 1];

  function finishLesson() {
    awardLesson(lesson!.id, lesson!.xp);
    if (following) router.push(lessonPath(following.id));
    else router.push("/programmes/data-ia");
  }

  function go(next: number) {
    setIndex(next);
    setGesture(null);
    setLessonStep(lesson!.id, next);
    window.scrollTo({ top: 0 });
  }

  function advance() {
    if (index === lesson!.steps.length - 1) finishLesson();
    else go(index + 1);
  }

  return (
    <div className="min-h-dvh bg-paper">
      <header className="no-print sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3">
          <Link
            href="/programmes/data-ia"
            aria-label="Fermer la leçon"
            className="grid size-10 place-items-center rounded-full hover:bg-paper"
          >
            <X className="size-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-ink-soft">
              Module {moduleInfo?.index} · {moduleInfo?.title}
            </p>
            <p className="truncate text-sm font-semibold">
              Leçon {lesson.id} · {lesson.title}
            </p>
          </div>
          <div className="hidden w-36 sm:block">
            <p className="text-right text-xs text-ink-soft">
              Étape {index + 1} sur {lesson.steps.length}
            </p>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-paper">
              <div
                className="h-full rounded-full bg-green"
                style={{ width: `${((index + 1) / lesson.steps.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-soft px-2.5 py-1 text-sm font-semibold text-orange">
            <Flame className="size-4" />
            {state.streak}
          </span>
          <span className="hidden rounded-full bg-gold px-2.5 py-1 text-sm font-semibold text-navy sm:inline">
            +{lesson.xp} XP
          </span>
        </div>
        <div className="mx-auto flex max-w-[1200px] gap-2 overflow-x-auto px-4 pb-3">
          {lesson.steps.map((item, stepIndex) => (
            <button
              key={`${item.type}-${stepIndex}`}
              type="button"
              onClick={() => go(stepIndex)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                stepIndex === index ? "bg-navy text-white" : "bg-paper text-ink-soft",
              )}
            >
              {stepIndex + 1}. {labels[item.type]}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
        {step?.type === "concept" ? (
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
            <Storyboard step={step} />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{step.title}</h1>
              <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-ink-soft">
                {step.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {step.example ? (
                <pre className="mt-5 overflow-x-auto rounded-2xl bg-blue-soft px-4 py-3 font-mono text-sm text-navy">
                  {step.example}
                </pre>
              ) : null}
              {step.remember ? (
                <p className="mt-5 rounded-2xl border border-gold/60 bg-[#fff8e8] px-4 py-3 text-sm leading-relaxed">
                  <span className="font-semibold">À retenir. </span>
                  {step.remember}
                </p>
              ) : null}
              <Button
                variant="navy"
                size="pill"
                className="mt-6"
                onClick={() => {
                  markDaily("video");
                  advance();
                }}
              >
                {index === lesson.steps.length - 1 ? "Valider la leçon" : "Continuer"}
              </Button>
              <p className="mt-4 text-xs text-ink-soft">
                Storyboard de démonstration&nbsp;: la vidéo filmée viendra avec le cours.
              </p>
            </div>
          </div>
        ) : null}

        {step?.type === "quiz" ? (
          <QuizRunner
            embedded
            questions={[
              {
                id: `${lesson.id}-quiz`,
                prompt: step.prompt,
                choices: step.choices,
                answer: step.answer,
                explanation: step.explanation,
              },
            ]}
            eyebrow={`Leçon ${lesson.id}`}
            xpPerCorrect={step.xp}
            onComplete={() => go(index + 1)}
          />
        ) : null}

        {step?.type === "complete" ? (
          <div className="mx-auto max-w-md">
            <p className="text-sm font-medium text-blue">Leçon {lesson.id} · Exercice</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">{step.title}</h1>
            <p className="mt-3 text-ink-soft">{step.prompt}</p>
            <pre className="mt-6 rounded-2xl bg-editor px-4 py-5 font-mono text-sm text-[#E8EDF7]">
              {step.code}
            </pre>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {step.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setGesture(option)}
                  className={cn(
                    "h-14 rounded-2xl border bg-white text-xl font-semibold",
                    gesture === option ? "border-blue text-blue ring-2 ring-blue/20" : "border-line",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            {gesture ? (
              <div
                className={cn(
                  "mt-4 rounded-2xl px-4 py-3 text-sm",
                  gesture === step.answer ? "bg-green-soft text-green-ink" : "bg-danger-soft text-danger",
                )}
              >
                <p className="font-semibold">
                  {gesture === step.answer ? "Bien joué\u202f! +10 XP" : "Regarde encore le signe."}
                </p>
                <p className="mt-1">{step.explanation}</p>
              </div>
            ) : null}
            <Button
              variant="navy"
              size="pill"
              className="mt-4 w-full"
              disabled={gesture !== step.answer}
              onClick={() => go(index + 1)}
            >
              Continuer
            </Button>
          </div>
        ) : null}

        {step?.type === "code" ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p className="text-sm text-ink-soft">Vidéo · {lesson.minutes} min</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">À toi de jouer</h1>
              <p className="mt-4 rounded-2xl border border-[#f0d7a2] bg-[#fff6e4] px-4 py-4 text-sm leading-relaxed">
                {step.prompt}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                L’éditeur comprend les filtres, le tri, head() et un groupby…sum(). Le fichier de travail est ventes.csv.
              </p>
              {state.completedLessons.includes(lesson.id) ? (
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-green-ink">
                  <Check className="size-4" /> Leçon déjà validée
                </p>
              ) : null}
            </div>
            <CodeWorkshop
              exerciseId={step.exerciseId}
              starter={step.starter}
              hint={step.hint}
              prompt={step.prompt}
              lessonId={lesson.id}
              onPass={advance}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
