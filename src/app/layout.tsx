import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

import ReactQueryProvider from "@/context/ReactQueryProvider";
import AuthContextProvider from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Template",
  description: "This is a project template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthContextProvider>
            {children}
            <Toaster />
          </AuthContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
