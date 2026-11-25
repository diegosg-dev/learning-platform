import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonScreen } from "@/components/lesson-screen";
import { getLesson, lessonIdFromParam, lessons } from "@/lib/lessons";

type Props = { params: Promise<{ lessonId: string }> };

export function generateStaticParams() {
  return lessons.map((lesson) => ({ lessonId: lesson.id.replace(".", "-") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getLesson(lessonIdFromParam(lessonId));
  return { title: lesson ? `Leçon ${lesson.id}` : "Leçon" };
}

export default async function Page({ params }: Props) {
  const { lessonId } = await params;
  const id = lessonIdFromParam(lessonId);
  if (!getLesson(id)) notFound();
  return <LessonScreen lessonId={id} />;
}
