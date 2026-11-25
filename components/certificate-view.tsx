"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/progress-provider";
import { frDate } from "@/lib/format";
import { levelFor } from "@/lib/levels";

const EXAMPLE = {
  name: "Pierre Leclerc d’Orleac",
  score: 86,
  date: "2026-11-20",
  number: "ACA–DATA–000123",
  banner: "+500 XP · Niveau 8 atteint",
};

function certificateNumber(name: string, date: string) {
  let hash = 0;
  const source = `${name}${date}`;
  for (let i = 0; i < source.length; i += 1) hash = (hash * 33 + source.charCodeAt(i)) >>> 0;
  return `ACA–DATA–${String((hash % 900000) + 100000)}`;
}

export function CertificateView({ mode }: { mode: "example" | "earned" }) {
  const { state, togglePortfolio } = useProgress();
  const [shared, setShared] = useState(false);
  const earnedReady = mode === "earned" && state.exam.status === "passed" && state.exam.date && state.exam.score !== null;
  const name = earnedReady
    ? `${state.learner.firstName} ${state.learner.lastName}`
    : EXAMPLE.name;
  const date = earnedReady && state.exam.date ? state.exam.date : EXAMPLE.date;
  const score = earnedReady && state.exam.score !== null ? state.exam.score : EXAMPLE.score;
  const number = mode === "example" ? EXAMPLE.number : certificateNumber(name, date);
  const level = levelFor(state.xp);

  function share() {
    const url = `${window.location.origin}/verifier/?n=${encodeURIComponent(number)}`;
    const target = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(target, "_blank", "noopener,noreferrer");
    setShared(true);
  }

  if (mode === "earned" && !earnedReady) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight">Pas encore de certificat</h1>
          <p className="mt-3 text-ink-soft">
            La simulation d’examen se débloque ici à partir de 70/100. En attendant, l’exemple reste consultable.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button variant="navy" size="pill" render={<Link href="/examen" />}>
              Voir l’examen
            </Button>
            <Button variant="outline" size="pill" render={<Link href="/certificats/exemple" />}>
              Voir l’exemple
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-page min-h-dvh bg-navy px-4 py-10 text-white sm:px-6">
      <div className="no-print mx-auto flex max-w-3xl items-center justify-between text-sm">
        <Link href="/certificats" className="text-white/70 hover:text-white">
          ← Certificats
        </Link>
        <span className="rounded-full bg-white/10 px-3 py-1 text-gold">
          {mode === "example" ? EXAMPLE.banner : `+500 XP · Niveau ${level.level}`}
        </span>
      </div>
      <h1 className="font-display mx-auto mt-8 max-w-3xl text-center text-4xl text-white sm:text-5xl">
        Félicitations, tu es certifié&nbsp;!
      </h1>
      <article className="certificate-sheet mx-auto mt-8 max-w-3xl rounded-panel border border-gold bg-white px-6 py-10 text-navy shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] sm:px-12">
        <div className="text-center">
          <span className="mx-auto grid size-10 place-items-center rounded-[10px] bg-gold font-semibold">A</span>
          <p className="mt-3 text-sm font-semibold">Académie</p>
          <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-blue uppercase">
            Certificat de réussite
          </p>
          <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">{name}</h2>
          <p className="mt-3 text-sm text-ink-soft">a validé le programme et l’examen final surveillé</p>
          <p className="mt-5 text-xl font-semibold text-blue">Data Analyst — Data &amp; IA</p>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-center sm:grid-cols-4">
          <div>
            <dt className="text-xs text-ink-soft">Score</dt>
            <dd className="mt-1 font-semibold">{score}/100</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-soft">Date</dt>
            <dd className="mt-1 font-semibold">{frDate(date)}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-soft">Durée du programme</dt>
            <dd className="mt-1 font-semibold">~60&nbsp;h</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-soft">N° de certificat</dt>
            <dd className="mt-1 font-semibold">{number}</dd>
          </div>
        </dl>
        <p className="mt-8 text-center text-sm">
          <Link href={`/verifier/?n=${encodeURIComponent(number)}`} className="text-gold-ink underline-offset-2 hover:underline">
            Vérifiable en ligne via un lien unique
          </Link>
        </p>
      </article>
      <div className="no-print mx-auto mt-6 flex max-w-3xl flex-col gap-2 sm:flex-row sm:justify-center">
        <Button variant="gold" size="pill" onClick={share}>
          {shared ? "Lien ouvert" : "Partager sur LinkedIn"}
        </Button>
        <Button variant="inverse" size="pill" onClick={() => window.print()}>
          Télécharger le PDF
        </Button>
        <Button
          variant="inverse"
          size="pill"
          onClick={togglePortfolio}
          disabled={mode === "example"}
        >
          {state.inPortfolio && mode === "earned" ? "Dans le portfolio" : "Ajouter au portfolio"}
        </Button>
      </div>
      <p className="mx-auto mt-5 max-w-xl text-center text-xs text-white/55">
        {mode === "example"
          ? "Exemple de certificat · aucune accréditation officielle (RNCP visé à terme). Le PDF passe par la fenêtre d’impression du navigateur."
          : "Certificat de démonstration, stocké sur cet appareil. Aucune accréditation officielle."}
      </p>
    </div>
  );
}
