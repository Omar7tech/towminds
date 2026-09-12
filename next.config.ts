import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the dev-only Next.js overlay (deploy prompts, route badge). No effect on production.
  devIndicators: false,
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
