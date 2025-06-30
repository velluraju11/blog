import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Ryha – The Future, Engineered for Everyone',
  description: 'Ryha is a visionary force reshaping the digital era through cutting-edge AI, autonomous systems, and hyper-secure architecture.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛡️</text></svg>',
  },
  openGraph: {
    title: 'Ryha – The Future, Engineered for Everyone',
    description: 'Ryha builds AI-native ecosystems where machines work for you — intelligently, securely, and forever.',
    type: 'website',
    url: 'https://ryha.tech',
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

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
