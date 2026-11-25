"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/catalogue", label: "Programmes" },
  { href: "/methode", label: "Méthode" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/entreprises", label: "Entreprises" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-white/10 bg-navy text-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-5">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Pages">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors",
                  active ? "text-white" : "text-white/70 hover:text-white",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button variant="inverse" size="pill" render={<Link href="/connexion" />}>
            Se connecter
          </Button>
          <Button variant="gold" size="pill" render={<Link href="/commencer" />}>
            Commencer
          </Button>
        </div>
        <button
          type="button"
          className="ml-auto grid size-10 place-items-center rounded-full text-white md:hidden"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Pages mobiles">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-xl px-2 py-3 text-base">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Button variant="inverse" size="pill" render={<Link href="/connexion" />}>
              Se connecter
            </Button>
            <Button variant="gold" size="pill" render={<Link href="/commencer" />}>
              Commencer
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
