import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Ryha',
  description: 'Ryha is a visionary force reshaping the digital era through cutting-edge AI, autonomous systems, and hyper-secure architecture.',
  openGraph: {
    title: 'Ryha - The Future, Engineered for Everyone',
    description: 'Ryha is a visionary force reshaping the digital era through cutting-edge AI, autonomous systems, and hyper-secure architecture.',
    type: 'website',
    url: 'https://ryha.com', // Replace with your actual domain
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'Ryha',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
