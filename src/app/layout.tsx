import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Link Share',
  description:
    'Link share is a full stack link sharing web app. It allows users to create a personal hub for sharing multiple links.',
};

const instrument_Sans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <AuthProvider>
        <Toaster position='top-center' />
        <body
          className={` ${instrument_Sans.className} antialiased bg-lightestGray`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
