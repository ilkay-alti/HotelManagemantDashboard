import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const InterSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Management System",
  description: "A hotel management system",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${InterSans.variable}  antialiased flex h-screen `}
      >
        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
