import type { Metadata } from 'next';
import './globals.css';
import { SupabaseProvider } from '@/components/SupabaseProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Underground Creator',
  description: 'All-in-one platform for underground musicians, dancers & creators',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        <SupabaseProvider>
          {children}
          <Toaster position="top-center" />
        </SupabaseProvider>
      </body>
    </html>
  );
}
