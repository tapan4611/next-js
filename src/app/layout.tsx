import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RestoPOS - Modern Restaurant POS",
  description: "High-performance restaurant point of sale system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>
        <div className="flex bg-background h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto p-8 relative">
            {children}
            <Toaster position="top-right" />
          </main>
        </div>
      </body>
    </html>
  );
}
