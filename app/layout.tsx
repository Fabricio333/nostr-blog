import './globals.css';
import type { Metadata } from 'next';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'Personal Blog',
  description: 'My personal blog using Nostr',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
