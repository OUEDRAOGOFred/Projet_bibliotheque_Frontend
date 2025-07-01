"use client";
import Navbar from "../components/Navbar";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px)', margin: 0, padding: 0 }}>{children}</main>
    </>
  );
} 