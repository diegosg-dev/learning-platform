import type { Metadata } from "next";
import { Pricing } from "@/components/pricing";

export const metadata: Metadata = { title: "Tarifs" };

const questions = [
  {
    q: "Les prix sont-ils définitifs\u00a0?",
    a: "Non. XXX\u00a0€, 0\u00a0€ et les frais d’examen XX\u00a0€ sont des hypothèses pour discuter l’offre. Rien n’est encaissé.",
  },
  {
    q: "L’examen est-il inclus\u00a0?",
    a: "Dans l’esquisse actuelle, l’accès aux cours est annuel et l’examen a un frais séparé, à définir. La simulation, elle, est ouverte.",
  },
  {
    q: "Puis-je arrêter\u00a0?",
    a: "L’hypothèse est un engagement d’un an, pas un prélèvement mensuel. Les conditions réelles seront écrites avant toute vente.",
  },
  {
    q: "Y a-t-il une accréditation\u00a0?",
    a: "Non. La reconnaissance RNCP est un objectif, pas un état. Le certificat de cette version est un exemple.",
  },
];

export default function TarifsPage() {
  return (
    <>
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-[820px] px-5 py-16">
          <p className="text-sm text-gold">Tarifs</p>
          <h1 className="font-display mt-3 text-4xl font-medium sm:text-6xl">Une année, six programmes.</h1>
          <p className="mt-4 max-w-[46ch] text-white/75">
            Deux portes&nbsp;: découvrir sans carte, ou imaginer l’année entière. Les chiffres ne sont pas un devis.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-[920px] px-5 py-14">
        <Pricing />
        <h2 className="mt-14 text-2xl font-semibold">Questions utiles</h2>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {questions.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="font-semibold">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
