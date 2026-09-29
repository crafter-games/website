import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://games.crafter.run"),
  title: "Crafter Games",
  description:
    "Juegos recreativos y educativos hechos por la comunidad de Crafter Station. Open source, gratis y desde Perú.",
  openGraph: {
    title: "Crafter Games",
    description:
      "Juegos recreativos y educativos hechos por la comunidad de Crafter Station.",
    url: "https://games.crafter.run",
    siteName: "Crafter Games",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Crafter Games: Jugamos lo que shipeamos.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crafter Games",
    description:
      "Juegos recreativos y educativos hechos por la comunidad de Crafter Station.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
