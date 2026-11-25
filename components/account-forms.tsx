"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProgress } from "@/components/progress-provider";

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    if (!email.includes("@") || password.length < 1) {
      setError("Indique un e-mail et un mot de passe. N’importe lequel ouvre la démo.");
      return;
    }
    router.push("/tableau-de-bord");
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" autoComplete="username" required className="h-11 rounded-xl px-3" placeholder="pierre@ecole.fr" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required className="h-11 rounded-xl px-3" />
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" variant="navy" size="pill" className="w-full">
        Entrer
      </Button>
      <p className="text-xs leading-relaxed text-ink-soft">
        Démo&nbsp;: aucun compte n’est créé. N’importe quel mot de passe ouvre la session déjà présente sur cet appareil.
      </p>
    </form>
  );
}

export function StartForm() {
  const router = useRouter();
  const { setLearner } = useProgress();
  const [offer, setOffer] = useState<string | null>(null);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("offre");
    if (value === "annuelle" || value === "decouverte") setOffer(value);
  }, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLearner(String(data.get("first") ?? ""), String(data.get("last") ?? ""));
    router.push("/tableau-de-bord");
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {offer ? (
        <p className="rounded-2xl bg-blue-soft px-3 py-2 text-sm text-navy">
          {offer === "annuelle"
            ? "Offre annuelle sélectionnée. Rien n’est facturé\u00a0: le prix n’est pas fixé."
            : "Offre découverte. Les premières leçons sont ouvertes, sans carte."}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first">Prénom</Label>
          <Input id="first" name="first" required className="h-11 rounded-xl px-3" defaultValue="Pierre" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last">Nom</Label>
          <Input id="last" name="last" required className="h-11 rounded-xl px-3" defaultValue="Leclerc d’Orleac" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" required className="h-11 rounded-xl px-3" placeholder="pierre@ecole.fr" />
      </div>
      <Button type="submit" variant="gold" size="pill" className="w-full">
        Créer mon accès démo
      </Button>
      <p className="text-xs leading-relaxed text-ink-soft">
        Le prénom s’affiche sur le tableau de bord et, si tu valides la simulation d’examen, sur le certificat. Rien n’est envoyé à un serveur.
      </p>
    </form>
  );
}

export function CompanyForm() {
  const [sent, setSent] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  if (sent) {
    return (
      <div className="rounded-panel border border-line bg-white p-6">
        <h2 className="text-xl font-semibold">Demande notée sur cet appareil</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Aucun message n’a été transmis. Dans cette version, le formulaire montre seulement le parcours. Un échange réel viendra avec l’offre entreprises.
        </p>
        <Button variant="outline" className="mt-4 h-10 rounded-full" onClick={() => setSent(false)}>
          Écrire un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-panel border border-line bg-white p-6">
      <div className="space-y-2">
        <Label htmlFor="org">Organisation</Label>
        <Input id="org" name="org" required className="h-11 rounded-xl px-3" placeholder="École, entreprise, équipe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="who">Nom</Label>
        <Input id="who" name="who" required className="h-11 rounded-xl px-3" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mail">E-mail</Label>
        <Input id="mail" name="mail" type="email" required className="h-11 rounded-xl px-3" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Ce que vous voulez former</Label>
        <Textarea id="message" name="message" required className="min-h-28 rounded-xl px-3" placeholder="Une cohorte, un métier, une contrainte de temps." />
      </div>
      <Button type="submit" variant="navy" size="pill">
        Demander un échange
      </Button>
    </form>
  );
}
