import type { Metadata } from "next";
import { ProgressProvider } from "@/components/progress-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Académie — L’école en ligne, le rythme d’une appli",
    template: "%s — Académie",
  },
  description:
    "Cursus de niveau universitaire, leçons de dix minutes, exercices dans le navigateur et examen surveillé. Première version, centrée sur le parcours Data.",
  applicationName: "Académie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          Aller au contenu
        </a>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
