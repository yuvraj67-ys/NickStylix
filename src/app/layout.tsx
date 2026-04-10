import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NickStylix - Free Fire & Instagram Stylish Name Generator 2025",
    template: "%s | NickStylix"
  },
  description: "Generate 100+ stylish names for Free Fire, BGMI, Instagram with Unicode fonts, AI name generator, symbols & borders. Best free stylish name generator 2025. No login required!",
  keywords: ["stylish name", "free fire name generator", "ff name", "stylish font", "unicode name", "bgmi name", "instagram username", "attitude name", "cool gamer name", "name generator"],
  authors: [{ name: "NickStylix" }],
  creator: "NickStylix",
  openGraph: {
    title: "NickStylix - Stylish Name Generator",
    description: "Generate 100+ stylish names for Free Fire, BGMI & Instagram instantly. Free, no login!",
    type: "website",
    locale: "en_IN",
    siteName: "NickStylix",
  },
  twitter: {
    card: "summary_large_image",
    title: "NickStylix - Stylish Name Generator",
    description: "100+ Unicode font styles for Free Fire & Instagram. Free!",
  },
  robots: { index: true, follow: true },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "NickStylix",
          "description": "Free stylish name generator for Free Fire, BGMI and Instagram with 100+ Unicode font styles",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
        })}} />
      </head>
      <body className="bg-gaming-dark text-white antialiased">
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}