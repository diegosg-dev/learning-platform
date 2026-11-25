import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammeView } from "@/components/programme-view";
import { getProgramme, programmes } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgramme(slug);
  return { title: programme ? programme.name : "Programme" };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getProgramme(slug)) notFound();
  return <ProgrammeView slug={slug} />;
}
