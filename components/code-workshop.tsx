"use client";

import { useEffect, useState } from "react";
import { Check, Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/progress-provider";
import { formatCell, runExercise, ventesCsv, type ExerciseId, type ExerciseRun } from "@/lib/grader";
import { cn } from "@/lib/utils";

export function CodeWorkshop({
  exerciseId,
  starter,
  hint,
  prompt,
  lessonId,
  onPass,
}: {
  exerciseId: ExerciseId;
  starter: string;
  hint: string;
  prompt: string;
  lessonId: string;
  onPass: () => void;
}) {
  const { state, takeHint, markDaily } = useProgress();
  const storageKey = `academie.draft.${exerciseId}`;
  const [code, setCode] = useState(starter);
  const [tab, setTab] = useState<"script" | "csv">("script");
  const [result, setResult] = useState<ExerciseRun | null>(null);
  const [running, setRunning] = useState(false);
  const [hintOpen, setHintOpen] = useState(state.hintsUsed.includes(lessonId));

  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) setCode(saved);
  }, [storageKey]);

  function run() {
    setRunning(true);
    window.setTimeout(() => {
      const next = runExercise(exerciseId, code);
      setResult(next);
      setRunning(false);
      if (next.passed) markDaily("exercises");
    }, 280);
  }

  return (
    <section className="flex h-full flex-col rounded-panel border border-line bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-blue uppercase">Exercice interactif</p>
          <h2 className="mt-1 text-lg font-semibold">Python · pandas</h2>
        </div>
      </div>
      <p className="sr-only">{prompt}</p>
      <div className="mt-4 overflow-hidden rounded-2xl bg-editor text-[#E8EDF7]">
        <div className="flex gap-1 border-b border-white/10 px-3 py-2">
          <button
            type="button"
            onClick={() => setTab("script")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs",
              tab === "script" ? "bg-white/10 text-white" : "text-white/50",
            )}
          >
            script.py
          </button>
          <button
            type="button"
            onClick={() => setTab("csv")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs",
              tab === "csv" ? "bg-white/10 text-white" : "text-white/50",
            )}
          >
            ventes.csv
          </button>
        </div>
        {tab === "script" ? (
          <label className="block">
            <span className="sr-only">Éditeur Python</span>
            <textarea
              value={code}
              spellCheck={false}
              onChange={(event) => {
                setCode(event.target.value);
                sessionStorage.setItem(storageKey, event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key !== "Tab") return;
                event.preventDefault();
                const target = event.currentTarget;
                const start = target.selectionStart;
                const end = target.selectionEnd;
                const next = `${code.slice(0, start)}  ${code.slice(end)}`;
                setCode(next);
                sessionStorage.setItem(storageKey, next);
                requestAnimationFrame(() => {
                  target.selectionStart = start + 2;
                  target.selectionEnd = start + 2;
                });
              }}
              className="min-h-[240px] w-full resize-y bg-transparent p-4 font-mono text-[13px] leading-6 outline-none"
            />
          </label>
        ) : (
          <pre className="max-h-[320px] overflow-auto p-4 font-mono text-[12.5px] leading-6 text-white/80">
            {ventesCsv()}
          </pre>
        )}
      </div>

      {hintOpen ? (
        <p className="mt-3 rounded-2xl bg-orange-soft px-4 py-3 text-sm leading-relaxed text-navy">
          {hint}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="outline"
          className="h-10 rounded-full px-4"
          onClick={() => {
            takeHint(lessonId);
            setHintOpen(true);
          }}
        >
          <Lightbulb className="size-4" />
          {state.hintsUsed.includes(lessonId) ? "Revoir l’indice" : "Indice (−5 XP)"}
        </Button>
        <Button
          variant="outline"
          className="h-10 rounded-full px-4"
          onClick={() => {
            setCode(starter);
            sessionStorage.removeItem(storageKey);
            setResult(null);
          }}
        >
          <RotateCcw className="size-4" />
          Réinitialiser
        </Button>
        <Button variant="navy" className="ml-auto h-10 rounded-full px-5" onClick={run} disabled={running}>
          {running ? "Exécution…" : "Exécuter le code"}
        </Button>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold tracking-[0.12em] text-ink-soft uppercase">Sortie</p>
        <div className="mt-2 overflow-x-auto rounded-2xl bg-editor p-4 text-[13px] text-[#E8EDF7]">
          {result?.error ? (
            <p className="text-[#ffb4ae]">{result.error}</p>
          ) : result?.table ? (
            <table className="w-full border-collapse font-mono">
              <thead>
                <tr className="text-left text-white/50">
                  <th className="pr-4 pb-2 font-normal" />
                  {result.table.columns.map((column) => (
                    <th key={column} className="pr-4 pb-2 font-normal">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.table.rows.map((row) => (
                  <tr key={`${row.index}-${row.cells.client ?? row.cells.ville}`}>
                    <td className="pr-4 text-white/40">{row.index}</td>
                    {result.table?.columns.map((column) => (
                      <td key={column} className="pr-4">
                        {formatCell(row.cells[column] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-white/45">La sortie s’affichera ici.</p>
          )}
        </div>
      </div>

      {result ? (
        <ul className="mt-3 flex flex-col gap-1.5 text-sm">
          {result.tests.map((test) => (
            <li key={test.id} className={test.pass ? "text-green-ink" : "text-danger"}>
              {test.pass ? "✓" : "×"} {test.label}
            </li>
          ))}
        </ul>
      ) : null}

      {result?.passed ? (
        <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-green-soft px-4 py-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-start gap-3">
            <span className="mt-0.5 grid size-6 place-items-center rounded-full bg-white text-green-ink">
              <Check className="size-4" />
            </span>
            <div>
              <p className="font-semibold text-green-ink">
                Excellent&nbsp;! Ton code passe les {result.tests.length} tests.
              </p>
              <p className="text-sm text-navy/75">
                {result.tests.map((test) => test.label).join(" · ")}
              </p>
            </div>
          </div>
          <Button variant="navy" size="pill" onClick={onPass}>
            Continuer
          </Button>
        </div>
      ) : null}
    </section>
  );
}
