import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const neueMachina = localFont({
  variable: "--font-neue-machina",
  src: [
    { path: "./fonts/NeueMachina-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/NeueMachina-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/NeueMachina-Ultrabold.woff2", weight: "800", style: "normal" },
  ],
});

const description =
  "Two Minds designs and engineers secure, scalable business systems: operations and CRM platforms, brand experiences, and cyber security for teams that need software built around how they actually work.";

export const metadata: Metadata = {
  metadataBase: new URL("https://wearetwominds.com"),
  title: { default: "Two Minds — Design & Engineer Your Business", template: "%s · Two Minds" },
  description,
  openGraph: { type: "website", url: "/", siteName: "Two Minds", title: "Two Minds — Design & Engineer Your Business", description },
  twitter: { card: "summary_large_image", title: "Two Minds — Design & Engineer Your Business", description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${neueMachina.variable} h-full scroll-smooth scroll-pt-[30px] overflow-x-clip antialiased motion-reduce:scroll-auto`}
    >
      <body className="flex min-h-full flex-col bg-[#a2b4b6] font-sans text-white">{children}</body>
    </html>
  );
}
