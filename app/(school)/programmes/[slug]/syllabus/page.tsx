import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA_SLUG, getProgramme, moduleLessons, modules, programmes } from "@/lib/content";
import { lessonPath } from "@/lib/lessons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgramme(slug);
  return { title: programme ? `Syllabus ${programme.name}` : "Syllabus" };
}

export default async function SyllabusPage({ params }: Props) {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) notFound();
  const isData = slug === DATA_SLUG;

  return (
    <article className="mx-auto max-w-[760px] px-4 py-8 sm:px-8">
      <p className="text-sm text-ink-soft">
        <Link href={`/programmes/${slug}`} className="text-blue">
          ← {programme.name}
        </Link>
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Syllabus · {isData ? "Data Analyst" : programme.name}</h1>
      <p className="mt-2 text-sm text-ink-soft">Durées indicatives, à titre d’exemple.</p>
      {isData ? (
        <div className="mt-8 space-y-8">
          {modules.map((mod) => (
            <section key={mod.id}>
              <h2 className="text-xl font-semibold">
                {mod.index}. {mod.title}
                <span className="ml-2 text-sm font-normal text-ink-soft">~{mod.hours}&nbsp;h</span>
              </h2>
              <p className="text-sm text-ink-soft">{mod.blurb}</p>
              <ol className="mt-3 space-y-2">
                {moduleLessons(mod.id).map((lesson) => (
                  <li key={lesson.id}>
                    <Link href={lessonPath(lesson.id)} className="font-medium hover:text-blue">
                      {lesson.id} {lesson.title}
                    </Link>
                    <p className="text-sm text-ink-soft">{lesson.summary}</p>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-ink-soft">Le syllabus détaillé sera publié à l’ouverture du parcours.</p>
      )}
    </article>
  );
}
