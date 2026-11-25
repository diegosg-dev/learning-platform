import Link from "next/link";
import { Check, Flame } from "lucide-react";
import { ProgrammeCard } from "@/components/catalogue-view";
import { Pricing } from "@/components/pricing";
import { Button } from "@/components/ui/button";
import { programmes, reasons } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] lg:py-24">
          <div>
            <p className="text-sm text-gold">
              <span className="font-semibold">Nouveau</span>
              <span className="mx-2 text-white/30">·</span>
              Parcours Data en accès anticipé
            </p>
            <h1 className="font-display mt-5 text-[2.7rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.6rem]">
              Apprends comme dans une vraie école.
              <span className="mt-2 block text-gold italic">Progresse comme dans un jeu.</span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-white/75 sm:text-lg">
              Des cursus complets de niveau universitaire, des leçons de dix minutes par jour, des exercices dans le navigateur, et un examen surveillé pour la certification.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="gold" size="pill" render={<Link href="/commencer" />}>
                Essayer gratuitement
              </Button>
              <Button variant="inverse" size="pill" render={<Link href="/catalogue" />}>
                Voir les programmes
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/55">Premières leçons gratuites · Sans carte bancaire</p>
          </div>

          <aside className="rounded-panel bg-[#0d1730] p-4 shadow-[0_30px_80px_-36px_rgba(0,0,0,0.7)] ring-1 ring-white/10 sm:p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Data &amp; IA · Module 3</span>
              <span className="inline-flex items-center gap-1 font-semibold text-orange">
                <Flame className="size-4" /> 12 jours
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">Filtrer un DataFrame avec pandas</h2>
            <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/30 p-4 font-mono text-[12.5px] leading-6 text-[#E7ECF8]">
              <code>
                <span className="text-[#9BB6FF]">import</span> pandas <span className="text-[#9BB6FF]">as</span> pd{"\n"}
                df = pd.read_csv(<span className="text-gold">&quot;ventes.csv&quot;</span>){"\n"}
                df[df[<span className="text-gold">&quot;montant&quot;</span>] &gt; 100].head()
              </code>
            </pre>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-soft px-3 py-1.5 text-sm font-semibold text-green-ink">
              <Check className="size-4" /> Bravo&nbsp;! +20 XP
            </p>
            <div className="mt-5">
              <div className="flex justify-between text-xs text-white/60">
                <span>Objectif du jour</span>
                <span>30/50 XP</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[60%] rounded-full bg-gold" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1200px] px-5 py-16 lg:py-24">
          <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">Pourquoi nous</p>
          <h2 className="font-display mt-4 max-w-[18ch] text-4xl leading-[1.08] font-medium text-balance sm:text-5xl">
            Le meilleur de Coursera, Duolingo et DataCamp, réuni.
          </h2>
          <p className="mt-4 max-w-[48ch] text-sm text-ink-soft">
            Trois repères de méthode. Académie n’est affiliée à aucune de ces entreprises.
          </p>
          <div className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <article
                key={reason.number}
                className="border-b border-line py-8 lg:border-b-0 lg:border-r lg:px-6 lg:last:border-r-0"
              >
                <span className="font-display text-3xl text-gold-ink">{reason.number}</span>
                <h3 className="mt-5 text-lg font-semibold">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{reason.text}</p>
                <span className="sr-only">Point {index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">6 programmes</p>
              <h2 className="font-display mt-3 text-4xl leading-tight font-medium sm:text-5xl">
                Choisis ton parcours.
              </h2>
            </div>
            <Link href="/catalogue" className="text-sm font-semibold text-blue">
              Voir le catalogue
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {programmes.map((programme) => (
              <ProgrammeCard key={programme.slug} programme={programme} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[920px] px-5 py-16 lg:py-24">
          <p className="text-center text-xs font-semibold tracking-[0.16em] text-blue uppercase">Tarifs</p>
          <h2 className="font-display mt-3 text-center text-4xl leading-tight font-medium sm:text-5xl">
            Un abonnement annuel, tous les programmes.
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-center text-sm text-ink-soft">
            Les montants ci-dessous sont des hypothèses. Rien n’est en vente dans cette version.
          </p>
          <div className="mt-10">
            <Pricing />
          </div>
          <p className="mt-6 text-center text-xs leading-relaxed text-ink-soft">
            Prix indicatifs non définitifs. Offre entreprises et écoles sur devis.
          </p>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-5 py-16 sm:flex-row sm:items-center lg:py-20">
          <div>
            <h2 className="font-display text-4xl leading-tight font-medium sm:text-5xl">
              Prêt à devenir un leader de demain&nbsp;?
            </h2>
            <p className="mt-3 text-white/70">Commence le parcours Data aujourd’hui. Dix minutes suffisent.</p>
          </div>
          <Button variant="gold" size="pill" render={<Link href="/commencer" />}>
            Créer mon compte gratuit
          </Button>
        </div>
      </section>
    </>
  );
}
