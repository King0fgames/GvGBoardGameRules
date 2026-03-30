import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "GvG Board Game Rules",
  description: "Rules reference for the GvG board game, including roles, structures, command skills, boss events, and halftime.",
  openGraph: {
    title: "GvG Board Game Rules",
    description:
      "Rules reference for the GvG board game, including roles, structures, command skills, boss events, and halftime.",
    siteName: "GvG Board Game Rules",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "GvG Board Game Rules",
    description:
      "Rules reference for the GvG board game, including roles, structures, command skills, boss events, and halftime.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
