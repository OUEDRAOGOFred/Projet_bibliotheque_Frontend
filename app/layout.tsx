import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientNavbarWrapper from "./components/ClientNavbarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2iE Bibliothèque",
  description: "Plateforme de gestion de bibliothèque 2iE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(120deg, #eaf0fa 0%, #c3cfe2 100%)',
          margin: 0,
          padding: 0,
        }}
      >
        <ClientNavbarWrapper />
        <main style={{ minHeight: 'calc(100vh - 64px)', margin: 0, padding: 0 }}>{children}</main>
      </body>
    </html>
  );
}
