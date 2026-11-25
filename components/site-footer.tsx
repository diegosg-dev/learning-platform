import Link from "next/link";
import { Logo } from "@/components/logo";
import { programmes } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="no-print bg-navy text-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo href="/" />
          <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-white/65">
            Une école en ligne, avec le rythme d’une appli. Première version, centrée sur le parcours Data.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-white/45 uppercase">École</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/methode" className="hover:text-white">Méthode</Link></li>
            <li><Link href="/tarifs" className="hover:text-white">Tarifs</Link></li>
            <li><Link href="/entreprises" className="hover:text-white">Entreprises</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-white">Mentions</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-white/45 uppercase">Apprendre</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/tableau-de-bord" className="hover:text-white">Tableau de bord</Link></li>
            <li><Link href="/catalogue" className="hover:text-white">Catalogue</Link></li>
            <li><Link href="/quiz" className="hover:text-white">Quiz rapide</Link></li>
            <li><Link href="/examen" className="hover:text-white">Examen</Link></li>
            <li><Link href="/certificats" className="hover:text-white">Certificats</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-white/45 uppercase">Programmes</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {programmes.map((programme) => (
              <li key={programme.slug}>
                <Link href={`/programmes/${programme.slug}`} className="hover:text-white">
                  {programme.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1200px] px-5 py-5 text-xs leading-relaxed text-white/50">
          Prototype pédagogique · prix, volumes, classements et frais d’examen sont des hypothèses · aucune accréditation RNCP à ce stade. Coursera, Duolingo et DataCamp sont cités comme repères de méthode, sans affiliation.
        </p>
      </div>
    </footer>
  );
}
