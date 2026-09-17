import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omni-Sphere Holographic Portfolio | Moe Kyaw Aung (MKA)",
  description:
    "Holographic Omni-Sphere interface with rotating 3D spheres, layered HUD panels, volumetric light animations, spatial project nodes, and conversational AI architect entity.",
  keywords: [
    "Moe Kyaw Aung",
    "Omni-Sphere",
    "Holographic Portfolio",
    "Three.js",
    "Next.js 16",
    "React 19",
    "WebGL",
    "POS Ultimate",
    "Full-Stack Architect",
    "Drizzle ORM",
    "PostgreSQL"
  ],
  authors: [{ name: "Moe Kyaw Aung", url: "https://gravatar.com/moekyawaung2026" }],
  openGraph: {
    title: "Omni-Sphere Holographic Portfolio | Moe Kyaw Aung",
    description:
      "Rotating 3D spheres, layered hologram panels, volumetric light animations, and spatial AI assistant.",
    url: "https://moekyawaung.dev",
    siteName: "Omni-Sphere Holographic Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
        width: 1200,
        height: 630,
        alt: "Moe Kyaw Aung Holographic Portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark bg-slate-950">
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
