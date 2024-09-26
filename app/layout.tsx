import type { Metadata } from "next";
import { Inter } from '@next/font/google';
import "./styles/globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Polinate",
  description: "Blossoming relationship between vendors and suppliers",
  icons: {
    icon: "/logosm.svg", // Path relative to the public directory
    apple: "/logosm.svg", // Apple Touch Icon
  },
  openGraph: {
    title: "Polinate",
    description: "Blossoming relationship between vendors and suppliers",
    url: "https://berther.com.au",
    siteName: "Polinate",
    images: [
      {
        url: "/logosm.svg", // Ensure this is in your public folder
        width: 1200,
        height: 630,
        alt: "Polinate logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@polinate",
    creator: "@adeep",
    title: "Polinate",
    description: "Blossoming relationship between vendors and suppliers",
    images: "/logosm.svg", // Path for Twitter card image
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: "#ffffff", // Match to the primary color of your brand/site
  alternates: {
    canonical: "https://berther.com.au",
  },
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

