import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-6">
      <div className="max-w-md text-center">
        <Logo tone="onLight" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Cette page n’est pas au programme.</h1>
        <p className="mt-3 text-ink-soft">Le lien est peut-être ancien, ou la leçon n’a pas encore de nom.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="navy" size="pill" render={<Link href="/" />}>
            Accueil
          </Button>
          <Button variant="outline" size="pill" render={<Link href="/catalogue" />}>
            Catalogue
          </Button>
        </div>
      </div>
    </div>
  );
}
