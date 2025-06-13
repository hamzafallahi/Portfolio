import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Hamza Fallahi's Portfolio",
  description: "A modern, sleek portfolio showcasing my work and experience",
  keywords: [
    "Hamza Fallahi",
    "Portfolio",
  ],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  openGraph: {
    title: "Titre OpenGraph",
    description: "Description OpenGraph.",
    url: "https://hamzafallahi.vercel.app/",
    images: [
      {
        url: "https://hamzafallahi.vercel.app/image.jpg",
        width: 1200,
        height: 630,
        alt: "Description de l'image",
      },
    ],
  },
  
        
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
            {children}
            <Analytics />
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
