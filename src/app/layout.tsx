import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import AuthContextProvider from "@/context/AuthContext";
import ReactQueryProvider from "@/context/ReactQueryProvider";

// const inter = Inter({ subsets: ["latin"] });

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
      <body>
        <ReactQueryProvider>
          <AuthContextProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
