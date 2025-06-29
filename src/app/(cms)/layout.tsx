import type { Metadata } from 'next';
import AdminShell from './admin-shell';

export const metadata: Metadata = {
  title: 'Ryha Admin',
  description: 'Content Management System for Ryha.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminShell>{children}</AdminShell>
  );
}
