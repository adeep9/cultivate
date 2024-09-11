import type { Metadata } from "next";
import { Inter } from '@next/font/google';
import "./styles/globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Cultivate",
  description: "by Adeep & Corey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
