import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PortfolioProvider } from "@/context/portfolioContext";
import { LoadingProvider } from "@/context/loadingContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aled Jones Portfolio",
  description: "Aled Jones' portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LoadingProvider>
          <PortfolioProvider>
            {children}
          </PortfolioProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
