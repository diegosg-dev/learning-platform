import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/account-forms";

export const metadata: Metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Se connecter</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Pas encore d’accès&nbsp;? <Link href="/commencer" className="font-semibold text-blue">Commencer</Link>
      </p>
      <div className="mt-8">
        <SignInForm />
      </div>
    </div>
  );
}
