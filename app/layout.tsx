import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Practice",
  description: "A practice site for learning Next.js features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="top-0 flex gap-4 p-4 mb-4 bg-gray-200 w-full">
          <Link href="/">Home</Link>

          <Link href="/users">Users</Link>

          <Link href="/posts">Posts</Link>
        </nav>

        {children}

        <footer className="bottom-0 w-full mt-4">
          Next.js Practice Site &copy; 2025
        </footer>
      </body>
    </html>
  );
}
