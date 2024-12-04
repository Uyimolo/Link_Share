import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Link Share",
  description:
    "Link share is a full stack link sharing web app. It allows users to create a personal hub for sharing multiple links.",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AuthProvider>
          <body
            className={` ${montserrat.className} mx-auto bg-[#eeeeee] antialiased`}
          >
            <Toaster position="top-center" />
            {children}
          </body>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
