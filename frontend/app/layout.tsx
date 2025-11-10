import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from '@/contexts/authContext';
import { Toaster } from '@/components/ui/sonner';
import { ContainerProvider } from '@/core/di/ContainerContext';
import Image from "next/image";

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
          <ContainerProvider>
            <AuthProvider>
              <Header />
              <div className="relative grow flex flex-col">
                <Image
                  src="/background/background.png"
                  alt="Background"
                  width={1920}
                  height={1080}
                  className="absolute inset-0 -z-10 h-3/4 w-full object-cover opacity-50"
                />
                <div className="absolute h-3/4 w-full inset-0 -z-10 bg-linear-to-b from-background via-background/80 to-background"/>
                {children}
              </div>
              <Footer />
              <Toaster />
            </AuthProvider>
          </ContainerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
