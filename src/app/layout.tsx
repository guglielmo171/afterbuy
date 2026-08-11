import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-thermal",
});

const title = "AfterBuy — Gestire ciò che succede dopo un acquisto";
const description =
  "AfterBuy rende visibili resi, rimborsi, garanzie e scadenze post-acquisto. Un micro-prodotto full-stack in evoluzione.";
const ogDescription =
  "Product preview in progress. AfterBuy rende visibili resi, rimborsi, garanzie e scadenze post-acquisto.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} · work in progress`,
    description: ogDescription,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: `${title} · work in progress`,
    description: ogDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${ibmPlexMono.variable}`}>
      <body>
        {/*
          THESIS: Urgent purchases rank on an oversized pick slip — mechanism visible before scroll.
          OWN-WORLD: Manila stock, thermal mono print, red marker stripe, kraft desk ground.
          STORY: Visitor reads the queue, trusts WIP honesty, knows try-now vs not-yet.
          FIRST VIEWPORT: Clipboard slip with headline, three ranked rows, one marker-urgent line, synthetic label.
          FORM: Pinned Action Slip, assigned index 3, seed dce32f14.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        {children}
      </body>
    </html>
  );
}