import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { annualPerks, discoveryPerks } from "@/lib/content";

export function Pricing() {
  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-2">
      <article className="flex flex-col rounded-panel border border-line bg-white p-6 sm:p-8">
        <p className="text-sm font-medium text-ink-soft">Découverte</p>
        <p className="mt-3 text-5xl font-semibold tracking-tight">0&nbsp;€</p>
        <ul className="mt-6 space-y-3 text-sm">
          {discoveryPerks.map((perk) => (
            <li key={perk.label} className="flex items-start gap-2">
              {perk.included ? (
                <Check className="mt-0.5 size-4 text-green-ink" />
              ) : (
                <Minus className="mt-0.5 size-4 text-ink-soft" />
              )}
              <span className={perk.included ? "" : "text-ink-soft"}>{perk.label}</span>
            </li>
          ))}
        </ul>
        <Button variant="outline" size="pill" className="mt-8" render={<Link href="/commencer?offre=decouverte" />}>
          Commencer gratuitement
        </Button>
      </article>
      <article className="flex flex-col rounded-panel bg-navy p-6 text-white sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-white/70">Annuel</p>
          <span className="rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-navy">Prix à définir</span>
        </div>
        <p className="mt-3 text-5xl font-semibold tracking-tight">
          XXX&nbsp;€
          <span className="ml-2 text-base font-medium text-white/60">/ an</span>
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          {annualPerks.map((perk) => (
            <li key={perk} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-gold" />
              <span>{perk}</span>
            </li>
          ))}
        </ul>
        <Button variant="gold" size="pill" className="mt-8" render={<Link href="/commencer?offre=annuelle" />}>
          Choisir l’offre annuelle
        </Button>
      </article>
    </div>
  );
}
