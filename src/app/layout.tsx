import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { UserProvider } from "./contexts/UserContext";

const satoshi = localFont({
  src: './fonts/Satoshi-Variable.woff2',
  display: 'swap',
  variable: '--font-satoshi',
});

export const metadata: Metadata = {
  title: "Event Tracker",
  description: "Your personal event tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body className="font-sans bg-[#161616]">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}