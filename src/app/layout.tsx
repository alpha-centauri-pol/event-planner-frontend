import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "./contexts/UserContext";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  display: "swap",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: {
    default: "SynCule",
    template: "%s | SynCule",
  },
  description:
    "Discover and manage events effortlessly with SynCule. Your intelligent event planning companion that helps you track, organize, and never miss important moments. Personalized event recommendations based on your interests.",
  keywords: [
    "event planner",
    "event management",
    "calendar app",
    "event tracker",
    "event discovery",
    "personalized events",
    "smart calendar",
    "event organizer",
    "GDG-VIT events",
    "tech events",
  ],
  authors: [{ name: "GDG-VIT Team" }],
  creator: "GDG-VIT",
  publisher: "GDG-VIT",
  icons: {
    icon: "./favicon.ico",
    shortcut: "/public/favicon.png",
    apple: "/public/favicon.png",
  },
  manifest: "/public/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    siteName: "SynCule",
    title: "SynCule - Smart Event Planning & Management",
    description:
      "Discover and manage events effortlessly with SynCule. Your intelligent event planning companion with personalized recommendations.",
    images: [
      {
        url: "/public/logo.svg",
        width: 1200,
        height: 630,
        alt: "SynCule - Event Planning Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SynCule - Smart Event Planning & Management",
    description:
      "Discover and manage events effortlessly with SynCule. Your intelligent event planning companion.",
    images: ["/public/logo.svg"],
    creator: "@GDG-VIT",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body className="font-sans bg-[#161616]">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
