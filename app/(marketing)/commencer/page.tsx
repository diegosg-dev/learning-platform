import type { Metadata } from "next";
import Link from "next/link";
import { StartForm } from "@/components/account-forms";

export const metadata: Metadata = { title: "Commencer" };

export default function CommencerPage() {
  return (
    <div className="mx-auto max-w-lg px-5 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Créer mon accès</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Déjà passé par ici&nbsp;? <Link href="/connexion" className="font-semibold text-blue">Se connecter</Link>
      </p>
      <div className="mt-8">
        <StartForm />
      </div>
    </div>
  );
}
