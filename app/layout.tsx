import "./globals.css";
import { Recursive } from "next/font/google";

const recursive = Recursive({
  subsets: ["latin"],
  variable: "--font-recursive",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${recursive.variable} antialiased root`}
      >
        {children}
      </body>
    </html>
  );
}
