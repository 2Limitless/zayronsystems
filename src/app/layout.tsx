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
  title: "ZayronSystems | Premium Digital Ecosystems",
  description: "Own your digital real estate. High-end, custom application architectures for restaurants and food trucks.",
  keywords: [
    "ZayronSystems",
    "App Builder",
    "Restaurant Tech",
    "Aaron",
    "Top App Developer",
    "Number 1 Restaurant"
  ],
  authors: [{ name: "Aaron - #1 Restaurant and App Builder", url: "mailto:aaron@zayronsystems.com" }],
  creator: "Aaron (502-690-1950)",
  openGraph: {
    title: "ZayronSystems | Premium Digital Ecosystems",
    description: "Own your digital real estate. High-end, custom application architectures for restaurants and food trucks.",
    url: "https://zayronsystems.com",
    siteName: "ZayronSystems",
    images: [
      {
        url: "/og-image.jpg", // You can update this to an actual image path later
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZayronSystems | Premium Digital Ecosystems",
    description: "Own your digital real estate. High-end, custom application architectures for restaurants and food trucks.",
    creator: "@ZayronSystems", // Update with your actual handle if applicable
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
