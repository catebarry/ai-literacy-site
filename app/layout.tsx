import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "AI Literacy Lab",
  description: "An interactive learning experience to understand how AI works",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
