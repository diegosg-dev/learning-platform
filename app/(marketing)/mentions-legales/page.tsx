import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions" };

export default function MentionsPage() {
  return (
    <article className="mx-auto max-w-[720px] px-5 py-16">
      <h1 className="font-display text-4xl font-medium">Mentions</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-soft">
        <p>Académie est un prototype pédagogique. Cette version n’est pas éditée par une personne morale, ne vend rien, et ne délivre aucun diplôme.</p>
        <p>Les prix, durées, volumes d’exercices, classements et frais d’examen sont des hypothèses, signalées comme telles sur les pages concernées.</p>
        <p>La progression, le nom saisi et les réponses aux quiz restent dans le navigateur (localStorage). Le formulaire entreprises ne transmet aucun message.</p>
        <p>La simulation d’examen n’ouvre ni la caméra, ni le micro, et n’enregistre aucune session.</p>
        <p>Coursera, Duolingo et DataCamp sont des marques citées comme repères de méthode. Académie n’y est pas affiliée.</p>
        <p>Le certificat affiché est un exemple. Aucune accréditation RNCP n’est en cours d’instruction dans cette version.</p>
      </div>
    </article>
  );
}
