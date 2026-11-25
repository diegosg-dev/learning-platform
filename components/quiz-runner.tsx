"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, Flame, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/progress-provider";
import type { Question } from "@/lib/lesson-types";
import { cn } from "@/lib/utils";

export function QuizRunner({
  questions,
  eyebrow,
  xpPerCorrect = 10,
  embedded = false,
  onComplete,
  doneHref = "/tableau-de-bord",
  doneLabel = "Retour au tableau de bord",
}: {
  questions: Question[];
  eyebrow: string;
  xpPerCorrect?: number;
  embedded?: boolean;
  onComplete?: (result: { correct: number; total: number }) => void;
  doneHref?: string;
  doneLabel?: string;
}) {
  const { state } = useProgress();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [done, setDone] = useState(false);
  const reported = useRef(false);
  const question = questions[index];

  function choose(id: string) {
    if (picked || !question) return;
    setPicked(id);
    const right = id === question.answer;
    setCorrectCount((count) => count + (right ? 1 : 0));
    setCombo((value) => (right ? value + 1 : 0));
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (done || !question || picked) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const number = Number(event.key);
      const choice = question.choices[number - 1];
      if (choice) choose(choice.id);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!question && !done) return null;

  function continueNext() {
    if (!question) return;
    if (index === questions.length - 1) {
      if (!reported.current) {
        reported.current = true;
        onComplete?.({ correct: correctCount, total: questions.length });
      }
      if (embedded) return;
      setDone(true);
      return;
    }
    setIndex((value) => value + 1);
    setPicked(null);
  }

  if (done) {
    return (
      <div className="mx-auto flex min-h-[70dvh] max-w-xl flex-col items-center justify-center px-5 text-center">
        <p className="text-sm font-medium text-blue">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {correctCount}/{questions.length}
        </h1>
        <p className="mt-3 text-ink-soft">
          {correctCount === questions.length
            ? "Série parfaite."
            : correctCount >= Math.ceil(questions.length * 0.6)
              ? "L’essentiel est là. Les explications restent sous chaque question si tu recommences."
              : "Rejoue le quiz\u202f: les mêmes questions, pour fixer le geste."}
        </p>
        <Button variant="navy" size="pill" className="mt-8" render={<Link href={doneHref} />}>
          {doneLabel}
        </Button>
      </div>
    );
  }

  const correct = picked === question.answer;
  const progress = (index + (picked ? 1 : 0)) / questions.length;

  return (
    <div className={cn("flex flex-col", embedded ? "" : "min-h-dvh bg-paper")}>
      {embedded ? null : (
        <header className="no-print flex items-center gap-4 px-4 py-4 sm:px-8">
          <Link
            href="/tableau-de-bord"
            aria-label="Fermer le quiz"
            className="grid size-10 place-items-center rounded-full hover:bg-white"
          >
            <X />
          </Link>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-green transition-all" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange">
            <Flame className="size-4" />
            {state.streak}
          </span>
        </header>
      )}

      <div className={cn("mx-auto w-full max-w-2xl flex-1 px-5", embedded ? "py-2" : "py-6 sm:py-10")}>
        <div className="flex flex-wrap items-center gap-2">
          <p className="rounded-full bg-blue-soft px-3 py-1 text-xs font-medium text-blue">
            {eyebrow} · Question {index + 1}/{questions.length}
          </p>
          {combo >= 2 ? (
            <p className="rounded-full bg-orange-soft px-3 py-1 text-xs font-semibold text-orange">
              Combo ×{combo}
            </p>
          ) : null}
        </div>
        <h1 className="mt-6 text-3xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
          {question.prompt}
        </h1>
        <div className="mt-8 flex flex-col gap-3" role="listbox" aria-label="Réponses">
          {question.choices.map((choice, choiceIndex) => {
            const isPicked = picked === choice.id;
            const isAnswer = choice.id === question.answer;
            const show = picked !== null;
            return (
              <button
                key={choice.id}
                type="button"
                role="option"
                aria-selected={isPicked}
                disabled={picked !== null}
                onClick={() => choose(choice.id)}
                className={cn(
                  "flex items-center gap-4 rounded-[18px] border bg-white px-4 py-4 text-left transition",
                  !show && "hover:border-blue/40",
                  show && isAnswer && "border-green bg-green-soft",
                  show && isPicked && !isAnswer && "border-danger bg-danger-soft",
                  !show && "border-line",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg border text-sm font-semibold",
                    show && isAnswer ? "border-green bg-white text-green-ink" : "border-line text-ink-soft",
                  )}
                >
                  {String.fromCharCode(65 + choiceIndex)}
                </span>
                <span className="font-mono text-[15px] leading-snug">{choice.label}</span>
                {show && isAnswer ? <Check className="ml-auto size-5 text-green-ink" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      {picked ? (
        <div className={cn(embedded ? "mt-4" : "sticky bottom-0", correct ? "bg-green-soft" : "bg-danger-soft")}>
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className={cn("font-semibold", correct ? "text-green-ink" : "text-danger")}>
                {correct
                  ? xpPerCorrect > 0
                    ? `Bonne réponse\u202f! +${xpPerCorrect} XP`
                    : "Bonne réponse\u202f!"
                  : "Pas tout à fait."}
              </p>
              <p className="mt-1 text-sm text-navy/80">{question.explanation}</p>
            </div>
            <Button variant="navy" size="pill" onClick={continueNext}>
              Continuer
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
