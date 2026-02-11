import type { Metadata } from "next";
import { JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import { ModeProvider } from "@/context/ModeContext";
import CursorTrail from "@/components/CursorTrail";
import ModeScene from "@/components/ModeScene";
import VueGridCursor from "@/components/VueGridCursor";
import NoirSpotlight from "@/components/NoirSpotlight";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Glitch Dualist",
  description: "Fullstack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrains.variable} ${unbounded.variable} font-mono bg-void overflow-x-hidden text-primary`}
      >
        <ModeProvider>
          <ModeScene />
          <VueGridCursor />
          <NoirSpotlight />
          {children}
          <CursorTrail />
          <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-overlay opacity-20 bg-noise"></div>
          <div className="pointer-events-none fixed inset-0 z-[90] scanlines"></div>
        </ModeProvider>
      </body>
    </html>
  );
}
