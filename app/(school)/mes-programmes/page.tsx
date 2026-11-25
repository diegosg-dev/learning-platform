"use client";

import Link from "next/link";
import { ProgrammeCard } from "@/components/catalogue-view";
import { useProgress } from "@/components/progress-provider";
import { programmes, programmeRatio } from "@/lib/content";

export default function MesProgrammesPage() {
  const { state } = useProgress();
  const ratio = programmeRatio(state.completedLessons);
  const percent = Math.round(ratio.ratio * 100);

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-8 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">Mes programmes</h1>
      <p className="mt-2 max-w-[52ch] text-ink-soft">
        Data &amp; IA est ouvert. Les cinq autres sont dans l’abonnement esquissé, pas encore dans le cours.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {programmes.map((programme) => (
          <div key={programme.slug} className="relative">
            <ProgrammeCard programme={programme} />
            {programme.available ? (
              <p className="mt-2 text-sm text-ink-soft">
                {percent}&nbsp;% du parcours ·{" "}
                <Link href={`/programmes/${programme.slug}`} className="font-semibold text-blue">
                  Continuer
                </Link>
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
