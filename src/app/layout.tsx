import type { Metadata } from "next";
import { Instrument_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Link Share",
  description:
    "Link share is a full stack link sharing web app. It allows users to create a personal hub for sharing multiple links.",
};

const instrument_Sans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
});

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
      <AuthProvider>
        <body
          className={` ${montserrat.className} bg-lightestGra mx-auto max-w-[1900px] bg-[#eeeeee] antialiased`}
        >
          <Toaster position="top-center" />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
