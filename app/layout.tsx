import "./globals.css";
import { Recursive } from "next/font/google";
import type { Metadata, Viewport } from "next";

const recursive = Recursive({
  subsets: ["latin", "vietnamese"],
  variable: "--font-recursive",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blogspark.dev";

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BlogSpark — Platform Engineering & DevOps Blog",
    template: "%s | BlogSpark",
  },
  description:
    "Insights on platform engineering, Kubernetes, DevOps, and scalable infrastructure. Written by Hoàng Chuẩn Trần.",
  keywords: [
    "platform engineering",
    "DevOps",
    "Kubernetes",
    "SRE",
    "infrastructure",
    "backend",
    "blog",
  ],
  authors: [{ name: "Hoàng Chuẩn Trần", url: "https://github.com/chuan99nd" }],
  creator: "Hoàng Chuẩn Trần",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "BlogSpark",
    title: "BlogSpark — Platform Engineering & DevOps Blog",
    description:
      "Insights on platform engineering, Kubernetes, DevOps, and scalable infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlogSpark — Platform Engineering & DevOps Blog",
    description:
      "Insights on platform engineering, Kubernetes, DevOps, and scalable infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={recursive.variable}>
      <body className="noise antialiased root">
        {children}
      </body>
    </html>
  );
}
