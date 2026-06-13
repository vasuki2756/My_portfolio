import { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "Vasuki — Builder | Maker | Manager",
  description:
    "Builder, maker, and developer passionate about crafting digital solutions and innovative technology. I blend creativity with technical expertise to solve real-world problems and empower communities.",
  authors: [{ name: "Vasuki G", url: "https://github.com/vasuki2756" }],
  openGraph: {
    title: "Vasuki G — AI & Data Science Enthusiast",
    description:
      "AI & Data Science student passionate about machine learning, full-stack development, and building innovative solutions.",
    siteName: "Vasuki G — AI & Data Science Enthusiast",
    url: "https://github.com/vasuki2756",
    type: "website",
    images: [
      {
        url: "/assets/og.png",
        width: 1200,
        height: 630,
        alt: "Vasuki Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vasuki G — AI & Data Science Enthusiast",
    description:
      "AI & Data Science student passionate about machine learning, full-stack development, and building innovative solutions.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
  metadataBase: new URL("https://github.com/vasuki2756"),
};

const nougat = localFont({
  src: "../components/fonts/Nougat.ttf",
  variable: "--font-nougat",
  display: "swap",
});

const leaguespartan = localFont({
  src: "../components/fonts/LeagueSpartan.ttf",
  variable: "--font-leaguespartan",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.weserv.nl" />
        <link rel="dns-prefetch" href="https://images.weserv.nl" />
      </head>
      <body
        className={`${nougat.variable} ${leaguespartan.variable} font-leaguespartan antialiased bg-background text-foreground`}
      >
        <Navbar />
        <main className="mx-auto flex-1 px-5 pb-10">
          <ScrollProgress className="bg-primary" />
          {children}
        </main>
        <Loader />
        <Analytics />
      </body>
    </html>
  );
}
