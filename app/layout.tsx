import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Practice",
  description: "A practice site for learning Next.js features",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        {children}

        <footer className="bottom-0 w-full mt-4">
          Next.js Practice Site &copy; 2025
        </footer>
      </body>
    </html>
  );
}
