import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import AdminShell from './admin-shell';

export const metadata: Metadata = {
  title: 'Ryha Admin',
  description: 'Content Management System for Ryha.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function CmsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <AdminShell>{children}</AdminShell>
        <Toaster />
      </body>
    </html>
  );
}
