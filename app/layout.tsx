import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { site } from "@/content/paul-profile";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Atty. Paul Anthony Magtulis is a Philippine attorney in private practice, advising clients across litigation, property, family, corporate, intellectual property, and criminal law.";

export const metadata: Metadata = {
  // TODO: site.url is a placeholder — set the production domain in content/paul-profile.ts.
  metadataBase: new URL(site.url),
  title: `${site.displayName} — Attorney at Law, Philippines`,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.displayName} — Attorney at Law`,
    description,
    url: "/",
    siteName: site.displayName,
    locale: "en_PH",
    type: "profile",
    images: [
      {
        url: "/images/paul/20260522_171437.jpg",
        width: 4000,
        height: 3000,
        alt: "Atty. Paul Magtulis working at his laptop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.displayName} — Attorney at Law`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${manrope.variable} h-full antialiased`}>
      <body className="grain flex min-h-full flex-col">{children}</body>
    </html>
  );
}
