import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NanoAI - Ultra-Small Model Platform",
  description: "Platform for ultra-small (<2B) AI models - browser inference, IoT deployment, and model compression",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="antialiased">{children}</body></html>;
}
