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
    // Add the `dark` class to enforce dark mode by default
    <html lang="en" className={`light ${inter.className}`}>
      {/* Set the body background color to #FFFCFB and apply font styles */}
      <body className={inter.className} style={{ backgroundColor: '#FFFCFB' }}>
        {children}
      </body>
    </html>
  );
}

