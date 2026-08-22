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
  title: "ZayronSystems | Enterprise System Software Development",
  description: "Industrial scale software. Custom enterprise architectures for heavy industry, logistics, and high-performance teams.",
  keywords: [
    "ZayronSystems",
    "Enterprise Software",
    "Industrial Systems",
    "System Architecture",
    "Logistics Software",
    "Custom App Development"
  ],
  authors: [{ name: "ZayronSystems Engineering", url: "mailto:aaron@zayronsystems.com" }],
  creator: "ZayronSystems",
  openGraph: {
    title: "ZayronSystems | Enterprise System Software Development",
    description: "Industrial scale software. Custom enterprise architectures for heavy industry, logistics, and high-performance teams.",
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
    title: "ZayronSystems | Enterprise System Software Development",
    description: "Industrial scale software. Custom enterprise architectures for heavy industry, logistics, and high-performance teams.",
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
    "description": "ZayronSystems builds custom enterprise software and architectures for heavy industry, logistics, and high-performance teams.",
    "url": "https://zayronsystems.com",
    "founder": {
      "@type": "Person",
      "name": "Aaron",
      "jobTitle": "Lead System Architect",
      "email": "aaron@zayronsystems.com",
      "telephone": "502-690-1950"
    },
    "slogan": "Industrial Scale Software.",
    "knowsAbout": [
      "Enterprise System Software",
      "Custom Architecture",
      "Industrial Systems",
      "Logistics Optimization",
      "Scalable Infrastructure"
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
