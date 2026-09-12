import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const neueMachina = localFont({
  variable: "--font-neue-machina",
  src: [
    { path: "./fonts/NeueMachina-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/NeueMachina-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/NeueMachina-Ultrabold.woff2", weight: "800", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s | Two Minds" },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  keywords: [
    "business systems",
    "CRM systems",
    "operations software",
    "web development",
    "cyber security",
    "brand experience",
    "custom software",
    "Two Minds",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription },
  appleWebApp: { capable: true, title: siteName, statusBarStyle: "black-translucent" },
};

// Tints the browser chrome on mobile to match the top of the page.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#a2b4b6" },
    { media: "(prefers-color-scheme: dark)", color: "#131314" },
  ],
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
