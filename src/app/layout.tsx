import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zayronsystems.com"),
  title: "ZayronSystems | Digital Behavior Engineers • Custom Software, Webapps & Built-In AI SEO",
  description: "ZayronSystems engineers custom websites, webapps, and digital software built around how customers think, choose, and buy. Every site comes standard with best-in-class Technical SEO and AI SEO (Generative Engine Optimization) for Google, ChatGPT, and Perplexity dominance.",
  keywords: [
    "ZayronSystems",
    "Digital Behavior Engineers",
    "Custom Software Development",
    "Custom Web Applications",
    "High Converting Websites",
    "AI SEO",
    "Generative Engine Optimization",
    "GEO",
    "ChatGPT Search Optimization",
    "Perplexity AI SEO",
    "Google Core Web Vitals",
    "Best Technical SEO",
    "Built-In SEO Web Design",
    "Custom Restaurant Apps",
    "Zero Commission Ordering",
    "Real Estate Portals",
    "Industrial Operations Software",
    "Conversion Architecture"
  ],
  authors: [{ name: "ZayronSystems Engineering", url: "mailto:aaron@zayronsystems.com" }],
  creator: "ZayronSystems",
  openGraph: {
    title: "ZayronSystems | Digital Behavior Engineers • Custom Software & Built-In AI SEO",
    description: "ZayronSystems engineers custom websites, webapps, and digital software built around how customers think, choose, and buy—with industry-leading SEO and AI SEO included standard.",
    url: "https://zayronsystems.com",
    siteName: "ZayronSystems",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZayronSystems | Digital Behavior Engineers • Custom Software & Built-In AI SEO",
    description: "ZayronSystems engineers custom websites and webapps with built-in AI SEO and technical search dominance included standard.",
    creator: "@ZayronSystems",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ZayronSystems",
    "description": "ZayronSystems is a digital behavior engineering firm building custom websites, web applications, zero-commission ordering platforms, and operations software built around how customers decide and buy. Every deployment includes elite Technical SEO and AI Generative Engine Optimization (GEO) standard.",
    "url": "https://zayronsystems.com",
    "founder": [
      {
        "@type": "Person",
        "name": "Aaron Ramey",
        "jobTitle": "Co-Founder & Lead System Architect",
        "email": "aaron@zayronsystems.com",
        "telephone": "502-690-1950"
      },
      {
        "@type": "Person",
        "name": "Xzavier",
        "jobTitle": "Co-Founder"
      }
    ],
    "slogan": "Custom software engineered around how customers decide and buy, with built-in search & AI dominance.",
    "knowsAbout": [
      "Digital Behavior Engineering",
      "AI SEO & Generative Engine Optimization (GEO)",
      "Technical Search Engine Optimization",
      "Google Core Web Vitals & Instant SSR",
      "AI Answer Engine Visibility (ChatGPT, Perplexity, Gemini)",
      "Custom Software Development",
      "High-Converting Web Applications",
      "Restaurant Tech & Direct Ordering",
      "Real Estate Client Portals",
      "Operations & Industrial Systems"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
