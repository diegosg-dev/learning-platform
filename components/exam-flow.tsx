"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Clock, Mic, Shield, Wifi } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { QuizRunner } from "@/components/quiz-runner";
import { useProgress } from "@/components/progress-provider";
import { examRules } from "@/lib/content";
import { PASS_MARK, examQuiz } from "@/lib/questions";
import { cn } from "@/lib/utils";

const checks = [
  { icon: Camera, label: "Caméra détectée", state: "Simulation\u00a0: non sollicitée" },
  { icon: Mic, label: "Micro détecté", state: "Simulation\u00a0: non sollicité" },
  { icon: Wifi, label: "Connexion stable", state: "OK" },
];

export function ExamIntro() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [identity, setIdentity] = useState(false);
  const [error, setError] = useState("");

  function start() {
    if (!accepted || !identity) {
      setError("Coche le règlement et simule le contrôle d’identité pour lancer la démonstration.");
      return;
    }
    router.push("/examen/session");
  }

  return (
    <div className="min-h-dvh bg-paper">
      <header className="no-print flex items-center justify-between border-b border-line bg-white px-5 py-3">
        <Logo tone="onLight" />
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue">
          <Shield className="size-4" /> Mode examen surveillé
        </span>
      </header>
      <div className="mx-auto grid max-w-[1100px] items-start gap-4 px-4 py-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.8fr)] lg:py-10">
        <section className="rounded-panel border border-line bg-white p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-blue-soft px-2.5 py-1 text-blue">Data &amp; IA</span>
            <span className="rounded-full bg-green-soft px-2.5 py-1 text-green-ink">Prérequis d’exemple</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Examen final — Certification Data Analyst
          </h1>
          <p className="mt-3 max-w-[58ch] text-ink-soft">
            Cet examen valide l’ensemble du programme. Il se déroule en ligne, sous surveillance, en une seule session.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Fact icon={<Clock className="size-4" />} value="90 min" label="Durée" />
            <Fact icon={<ListIcon />} value="30 QCM" label="+ 3 exercices de code" />
            <Fact icon={<Shield className="size-4" />} value="70/100" label="Note minimale" />
          </div>
          <h2 className="mt-8 text-lg font-semibold">Règles de l’examen</h2>
          <ul className="mt-3 space-y-3">
            {examRules.map((rule) => (
              <li key={rule.title} className="rounded-2xl bg-paper px-4 py-3">
                <p className="font-medium">{rule.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{rule.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-panel border border-line bg-white p-5">
          <h2 className="font-semibold">Vérification technique</h2>
          <div className="mt-3 grid h-36 place-items-center rounded-2xl bg-editor text-sm text-white/70">
            Aperçu caméra
            <span className="sr-only">Aucune caméra n’est activée dans cette démonstration.</span>
          </div>
          <ul className="mt-3 space-y-2">
            {checks.map((check) => (
              <li key={check.label} className="flex items-center justify-between rounded-xl bg-green-soft px-3 py-2 text-sm">
                <span className="inline-flex items-center gap-2 text-green-ink">
                  <check.icon className="size-4" /> {check.label}
                </span>
                <span className="text-xs text-green-ink">{check.state}</span>
              </li>
            ))}
            <li className={cn("flex items-center justify-between rounded-xl px-3 py-2 text-sm", identity ? "bg-green-soft text-green-ink" : "bg-paper")}>
              <span>Pièce d’identité</span>
              <button type="button" className="text-xs font-semibold text-blue" onClick={() => setIdentity(true)}>
                {identity ? "Vérifiée (simulation)" : "Simuler le contrôle"}
              </button>
            </li>
          </ul>
          <label className="mt-4 flex items-start gap-3 rounded-2xl border border-line px-3 py-3 text-sm">
            <Checkbox checked={accepted} onCheckedChange={setAccepted} />
            <span>J’ai lu et j’accepte le règlement de l’examen</span>
          </label>
          {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
          <Button variant="navy" size="pill" className="mt-4 w-full" onClick={start}>
            Commencer l’examen
          </Button>
          <p className="mt-3 text-center text-xs text-ink-soft">
            Frais d’examen&nbsp;: XX&nbsp;€ (hypothèse, à définir). Cette session est une simulation de 8 questions, sans enregistrement.
          </p>
          <Link href="/tableau-de-bord" className="mt-3 block text-center text-sm text-blue">
            Revenir au tableau de bord
          </Link>
        </section>
      </div>
    </div>
  );
}

function Fact({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-paper px-4 py-3">
      <div className="text-ink-soft">{icon}</div>
      <p className="mt-2 font-semibold">{value}</p>
      <p className="text-xs text-ink-soft">{label}</p>
    </div>
  );
}

function ListIcon() {
  return <span className="text-sm font-semibold text-ink-soft">QCM</span>;
}

export function ExamSession() {
  const { finishExam } = useProgress();
  const [score, setScore] = useState<number | null>(null);

  if (score !== null) {
    const passed = score >= PASS_MARK;
    return (
      <div className="grid min-h-dvh place-items-center bg-paper px-6">
        <div className="max-w-lg text-center">
          <p className="text-sm font-medium text-blue">Simulation · {examQuiz.length} questions au lieu de 30</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">{score}/100</h1>
          <p className="mt-3 text-ink-soft">
            {passed
              ? "Note suffisante. Le certificat de démonstration est débloqué sur cet appareil."
              : "En dessous de 70. Dans le vrai examen, il faudrait attendre 14 jours. Ici, tu peux recommencer."}
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            {passed ? (
              <Button variant="gold" size="pill" render={<Link href="/certificats/obtenu" />}>
                Voir le certificat
              </Button>
            ) : (
              <Button variant="navy" size="pill" render={<Link href="/examen" />}>
                Revenir à l’introduction
              </Button>
            )}
            <Button variant="outline" size="pill" render={<Link href="/tableau-de-bord" />}>
              Tableau de bord
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-paper">
      <QuizRunner
        questions={examQuiz}
        eyebrow="Examen · simulation"
        xpPerCorrect={0}
        doneHref="/examen"
        doneLabel="Continuer"
        onComplete={(result) => {
          const value = Math.round((result.correct / result.total) * 100);
          finishExam(value);
          setScore(value);
        }}
      />
      <p className="px-6 pb-8 text-center text-xs text-ink-soft">
        Les bonnes réponses ne s’affichent qu’après chaque question, pour que la démo reste utile. Un examen réel ne les montrerait pas.
      </p>
    </div>
  );
}
