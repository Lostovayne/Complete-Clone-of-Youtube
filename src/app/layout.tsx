import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NewTube | Your favorite videos, right here",
  description:
    "NewTube is a video sharing platform that allows you to share your favorite videos with your friends and family.",
  icons: {
    icon: "/logo.svg",
  },
  themeColor: "#000000",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  manifest: "/manifest.json",
  category: "social",
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "NewTube | Your favorite videos, right here",
    description:
      "NewTube is a video sharing platform that allows you to share your favorite videos with your friends and family.",
    images: "/logo.svg",
  },
  openGraph: {
    title: "NewTube | Your favorite videos, right here",
    description:
      "NewTube is a video sharing platform that allows you to share your favorite videos with your friends and family.",
    images: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
