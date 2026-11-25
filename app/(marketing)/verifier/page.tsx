"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/components/progress-provider";

export default function VerifierPage() {
  const { state } = useProgress();
  const [number, setNumber] = useState<string | null>(null);

  useEffect(() => {
    setNumber(new URLSearchParams(window.location.search).get("n"));
  }, []);

  const example = number === "ACA–DATA–000123";
  const earned = state.exam.status === "passed";

  return (
    <div className="mx-auto max-w-lg px-5 py-16">
      <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">Vérification</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Certificat {number ?? "…"}</h1>
      {number === null ? (
        <p className="mt-4 text-ink-soft">Lecture du numéro…</p>
      ) : example ? (
        <p className="mt-4 leading-relaxed text-ink-soft">
          Ce numéro correspond au certificat d’exemple de Pierre Leclerc d’Orleac, parcours Data Analyst. Il ne prouve pas une session réelle.
        </p>
      ) : earned ? (
        <p className="mt-4 leading-relaxed text-ink-soft">
          Une simulation d’examen a été validée sur cet appareil au nom de {state.learner.firstName} {state.learner.lastName}. Ce registre n’est pas public&nbsp;: il vit dans le navigateur.
        </p>
      ) : (
        <p className="mt-4 leading-relaxed text-ink-soft">
          Numéro introuvable. Les certificats de cette démo ne sont pas inscrits dans un registre public.
        </p>
      )}
      <Link href="/certificats/exemple" className="mt-6 inline-block text-sm font-semibold text-blue">
        Voir l’exemple de certificat
      </Link>
    </div>
  );
}
