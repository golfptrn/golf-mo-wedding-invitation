import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["300","400","500"], variable: "--font-roboto-mono" });

const loveLace = localFont({
  src: [
    { path: "./fonts/lovelace/LovelaceText-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/lovelace/LovelaceText-BoldItalic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-lovelace",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Golf & Mo Wedding Invitation",
  description: "register RVSP here",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} ${loveLace.variable}`}>
      <head>
        <Script />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
