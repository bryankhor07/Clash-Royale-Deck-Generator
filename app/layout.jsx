import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clash Royale Deck Builder",
  description:
    "It's a simple website that generates a deck based on a win condition and max average elixir",
  metadataBase: new URL("https://clash-royale-deck-generator.vercel.app/"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Clash Royale Deck Builder",
    description:
      "Generate Clash Royale decks by win condition and elixir constraints. Role-balanced with archetype detection.",
    url: "/",
    siteName: "Clash Royale Deck Builder",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Clash Royale Deck Generator preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clash Royale Deck Builder",
    description:
      "Generate Clash Royale decks by win condition and elixir constraints.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
