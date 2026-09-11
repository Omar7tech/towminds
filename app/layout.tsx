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

export const metadata: Metadata = {
  title: "twominds",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${neueMachina.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
