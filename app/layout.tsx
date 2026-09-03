import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkilledHyre Labs | BUILD. AUTOMATE. MARKET. SCALE.",
  description: "SkilledHyre Labs helps businesses transform ideas and challenges into scalable digital products, intelligent automation systems and measurable growth.",
  keywords: [
    "SkilledHyre Labs",
    "AI Automation",
    "Software Engineering",
    "Digital Marketing",
    "Tech Talent",
    "Enterprise Solutions",
    "C# .NET",
    "Next.js",
  ],
  authors: [{ name: "SkilledHyre Labs" }],
  openGraph: {
    title: "SkilledHyre Labs | Technology + AI + Growth",
    description: "WE BUILD WHAT MOVES BUSINESS FORWARD. Combine AI, software engineering, automation and digital marketing to scale.",
    url: "https://skilledhyrelabs.com",
    siteName: "SkilledHyre Labs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="bg-[#08090E] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
