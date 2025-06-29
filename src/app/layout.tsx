import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Ryha – The Future, Engineered for Everyone',
  description: 'Ryha is a visionary force reshaping the digital era through cutting-edge AI, autonomous systems, and hyper-secure architecture.',
  openGraph: {
    title: 'Ryha – The Future, Engineered for Everyone',
    description: 'Ryha builds AI-native ecosystems where machines work for you — intelligently, securely, and forever.',
    type: 'website',
    url: 'https://ryha.in',
    images: [
      {
        url: 'https://ik.imagekit.io/ps8bybjwy/Screenshot%202025-06-11%20101654.png?updatedAt=1750819846177',
        width: 1200,
        height: 630,
        alt: 'Ryha Logo and Tagline',
      },
    ],
  },
  keywords: ['AI', 'autonomous systems', 'cybersecurity', 'operating system', 'AI assistant', 'penetration testing'],
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
