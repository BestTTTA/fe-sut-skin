import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200"], 
});

const noto_sans_thai = Noto_Sans_Thai({
  subsets: ["latin"],
  weight: ["200"], 
});


export const metadata: Metadata = {
  title: "Sut Skin Treatment",
  description: "Sut Skin Treatment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto_sans_thai.className}> 
        {children}
      </body>
    </html>
  );
}
