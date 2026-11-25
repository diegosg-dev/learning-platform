import type { Metadata } from "next";
import { CompanyForm } from "@/components/account-forms";

export const metadata: Metadata = { title: "Entreprises" };

export default function EntreprisesPage() {
  return (
    <>
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-[1000px] px-5 py-16">
          <p className="text-sm text-gold">Entreprises et écoles</p>
          <h1 className="font-display mt-3 max-w-[16ch] text-4xl leading-[1.08] font-medium sm:text-6xl">
            Former une cohorte, pas seulement ouvrir des comptes.
          </h1>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1000px] gap-10 px-5 py-14 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-5 text-ink-soft">
          <p className="text-lg leading-relaxed text-navy">
            L’offre collective est sur devis. Elle n’est pas chiffrée dans cette version, et le formulaire n’envoie rien.
          </p>
          <p>
            Une cohorte suit le même parcours, avec un rythme commun et un examen en fin de cycle. Le tableau de suivi — qui a décroché, qui bloque sur un module — viendra avec le produit. Ici, on peut seulement décrire le besoin.
          </p>
          <ul className="space-y-2 text-sm">
            <li>Parcours Data disponible en démo, les cinq autres à l’ouverture.</li>
            <li>Volumes, prix et accompagnement&nbsp;: à écrire ensemble.</li>
            <li>Pas de promesse d’accréditation.</li>
          </ul>
        </div>
        <CompanyForm />
      </div>
    </>
  );
}
