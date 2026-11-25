import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Méthode",
  description: "Comment une leçon Académie est construite\u00a0: concept, question, geste, script.",
};

const beats = [
  { time: "2 min", title: "Comprendre", text: "Une idée, dite court. Un storyboard tient lieu de vidéo dans cette version." },
  { time: "2 min", title: "Question", text: "Un QCM. La bonne réponse s’explique tout de suite, pas à la fin du chapitre." },
  { time: "2 min", title: "Geste", text: "Compléter un signe, une fonction, un mot. Le doigt apprend avant la page entière." },
  { time: "4 min", title: "Script", text: "Un éditeur, un fichier, des tests. Le code passe, ou il dit ce qui manque." },
];

export default function MethodePage() {
  return (
    <>
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-[820px] px-5 py-16 lg:py-20">
          <p className="text-sm text-gold">Méthode</p>
          <h1 className="font-display mt-3 text-4xl leading-[1.08] font-medium sm:text-6xl">
            Dix minutes, mais une vraie leçon.
          </h1>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-white/75">
            La profondeur d’un cours, découpée pour tenir dans une journée chargée. Pas une carte à swiper.
          </p>
        </div>
      </header>
      <article className="mx-auto max-w-[820px] px-5 py-14">
        <h2 className="text-2xl font-semibold">Deux promesses tenues ensemble</h2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Un cursus a un début, un milieu, un examen. Une appli a un rendez-vous quotidien. Académie garde les deux&nbsp;: des modules qui s’enchaînent, et une série qui se joue le jour même.
        </p>
        <h2 className="mt-12 text-2xl font-semibold">La leçon, en quatre temps</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {beats.map((beat, index) => (
            <li key={beat.title} className="rounded-card border border-line bg-white p-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-gold-ink uppercase">0{index + 1} · {beat.time}</p>
              <h3 className="mt-3 text-lg font-semibold">{beat.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{beat.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm leading-relaxed text-ink-soft">
          La leçon 3.4 du parcours Data suit exactement ce découpage. Les autres leçons de cette version tiennent surtout dans le premier temps, avec assez de matière pour lire le cours.
        </p>
        <h2 className="mt-12 text-2xl font-semibold">La série, sans infantiliser</h2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          L’XP, la ligue et la flamme servent à revenir demain. Ils ne remplacent pas le cours. Les classements de cette démo sont fictifs. Ton XP, lui, bouge vraiment, dans le navigateur.
        </p>
        <h2 className="mt-12 text-2xl font-semibold">L’examen, quand on est prêt</h2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Le certificat se joue sur un examen surveillé&nbsp;: durée, pièce d’identité, une seule tentative, puis un délai. Ici, c’est une simulation. Aucune caméra n’est ouverte, rien n’est enregistré, et l’accréditation RNCP n’existe pas encore.
        </p>
        <Button variant="navy" size="pill" className="mt-8" render={<Link href="/lecons/3-4" />}>
          Ouvrir la leçon 3.4
        </Button>
      </article>
    </>
  );
}
