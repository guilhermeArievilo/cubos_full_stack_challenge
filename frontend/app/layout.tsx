import 'reflect-metadata';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from '@/contexts/authContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cubos Movie",
  description: "Movies Lib",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen text-on-surface`}
      >
        <ThemeProvider attribute={'class'} defaultTheme="dark">
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
