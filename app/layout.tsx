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
    "SEO & SMM Services",
  ],
  authors: [{ name: "SkilledHyre Labs" }],
  openGraph: {
    title: "SkilledHyre Labs | Technology + AI + Growth",
    description: "WE BUILD WHAT MOVES BUSINESS FORWARD. Combine AI, software engineering, automation and digital marketing to scale.",
    url: "https://skilledhyre-portfolio.vercel.app",
    siteName: "SkilledHyre Labs",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SkilledHyre Labs",
  url: "https://skilledhyre-portfolio.vercel.app",
  logo: "https://skilledhyre-portfolio.vercel.app/images/arun-kumar.jpg",
  description: "Enterprise AI automation, software engineering, digital marketing, SEO, and tech talent solutions.",
  sameAs: [
    "https://www.linkedin.com/in/arun-k-915020b6/",
    "https://www.linkedin.com/in/smita-kumari-3aab491aa/",
  ],
  knowsAbout: [
    "Generative AI",
    "Software Engineering",
    "C# .NET Core",
    "Next.js",
    "Digital Marketing",
    "Search Engine Optimization",
    "Social Media Marketing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#08090E] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
