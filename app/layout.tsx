import './globals.css';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Head from 'next/head';

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
      <Head />
      <body className="bg-background text-foreground">
        <Header />
        <main className="mx-auto max-w-7xl p-6">{children}</main>
      </body>
    </html>
  );
}
