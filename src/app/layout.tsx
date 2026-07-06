import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AdminMode } from "@/components/AdminMode";
import { Header, Footer } from "@/components/Layout";

const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });
const ethnocentric = localFont({
  src: [
    { path: "./fonts/ethnocentric-regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/ethnocentric-bold.otf", weight: "900", style: "normal" }
  ],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://refhvac.com"),
  title: { default: "Hughes Ventilation Air Conditioning Ltd", template: "%s | Hughes HVAC" },
  description: "Aberdeen-based HVAC, refrigeration, testing and engineering services for onshore, offshore and marine projects.",
  openGraph: { title: "Hughes Ventilation Air Conditioning Ltd", description: "Industrial HVAC engineering for offshore, onshore and marine environments.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable} ${ethnocentric.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <AdminMode />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
