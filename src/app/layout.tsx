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
  title: "ZayronSystems | Custom Enterprise Software & Architecture",
  description: "ZayronSystems builds bespoke enterprise software, zero-commission ordering apps, digital showrooms, and IoT industrial infrastructure to maximize ROI.",
  keywords: [
    "ZayronSystems",
    "Enterprise Software Development",
    "Custom Restaurant Apps",
    "Zero Commission Ordering",
    "Auto Dealership Digital Showrooms",
    "Industrial IoT Software",
    "Predictive Maintenance Systems",
    "Custom CRM ERP",
    "Digital Transformation"
  ],
  authors: [{ name: "ZayronSystems Engineering", url: "mailto:aaron@zayronsystems.com" }],
  creator: "ZayronSystems",
  openGraph: {
    title: "ZayronSystems | Custom Enterprise Software & Architecture",
    description: "ZayronSystems builds bespoke enterprise software, zero-commission ordering apps, digital showrooms, and IoT industrial infrastructure to maximize ROI.",
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
    title: "ZayronSystems | Custom Enterprise Software & Architecture",
    description: "ZayronSystems builds bespoke enterprise software, zero-commission ordering apps, digital showrooms, and IoT industrial infrastructure to maximize ROI.",
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
    "description": "ZayronSystems builds bespoke enterprise software, zero-commission ordering apps, digital showrooms, and IoT industrial infrastructure for high-performance teams.",
    "url": "https://zayronsystems.com",
    "founder": {
      "@type": "Person",
      "name": "Aaron",
      "jobTitle": "Lead System Architect",
      "email": "aaron@zayronsystems.com",
      "telephone": "502-690-1950"
    },
    "slogan": "Digital Transformation at Scale.",
    "knowsAbout": [
      "Enterprise System Software",
      "Restaurant Tech & Zero Commission Apps",
      "Auto Dealership Digital Showrooms",
      "Industrial IoT & Predictive Maintenance",
      "Custom Architecture",
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
