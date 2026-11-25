"use client";

import Link from "next/link";
import { useProgress } from "@/components/progress-provider";

export default function CertificatsPage() {
  const { state } = useProgress();
  const passed = state.exam.status === "passed";

  return (
    <div className="mx-auto max-w-[800px] px-4 py-8 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">Certificats</h1>
      <p className="mt-2 text-ink-soft">
        Un certificat se débloque en validant la simulation d’examen (70/100). L’exemple reste visible dans tous les cas.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href="/certificats/exemple" className="rounded-panel border border-line bg-white p-5 hover:border-blue/30">
          <p className="text-xs font-semibold tracking-[0.14em] text-gold-ink uppercase">Exemple</p>
          <h2 className="mt-2 text-xl font-semibold">Data Analyst</h2>
          <p className="mt-2 text-sm text-ink-soft">Pierre Leclerc d’Orleac · 86/100 · 20 nov. 2026</p>
        </Link>
        {passed ? (
          <Link href="/certificats/obtenu" className="rounded-panel border border-gold bg-white p-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-green-ink uppercase">Obtenu</p>
            <h2 className="mt-2 text-xl font-semibold">
              {state.learner.firstName} {state.learner.lastName}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">Score {state.exam.score}/100 · {state.inPortfolio ? "dans le portfolio de démo" : "pas encore au portfolio"}</p>
          </Link>
        ) : (
          <div className="rounded-panel border border-dashed border-line bg-white p-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">À obtenir</p>
            <h2 className="mt-2 text-xl font-semibold">Pas encore de certificat</h2>
            <p className="mt-2 text-sm text-ink-soft">
              {state.exam.status === "failed"
                ? `Dernière simulation\u00a0: ${state.exam.score}/100. Tu peux recommencer.`
                : "La simulation n’a pas encore été tentée."}
            </p>
            <Link href="/examen" className="mt-3 inline-block text-sm font-semibold text-blue">
              Voir l’examen
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
