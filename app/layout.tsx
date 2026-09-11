import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const neueMachina = localFont({
  variable: "--font-neue-machina",
  src: [
    { path: "./fonts/NeueMachina-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/NeueMachina-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/NeueMachina-Ultrabold.otf", weight: "800", style: "normal" },
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
      className={`${neueMachina.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
