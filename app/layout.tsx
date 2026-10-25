import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Team Indigo — GGITS",
  description: "Team Indigo is the event management club of Gyan Ganga Institute of Technology and Sciences. Discover Pehel, its Diwali celebration for the college’s auxiliary staff.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
