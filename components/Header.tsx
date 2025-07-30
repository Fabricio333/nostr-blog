import Link from 'next/link';
import { fetchProfile } from '../lib/nostr';
import settings from '../settings.json';
import DarkModeToggle from './DarkModeToggle';

export default async function Header() {
  const profile = await fetchProfile(settings.npub);
  const siteName = profile?.name || 'Nostr Blog';
  return (
    <header className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          {siteName}
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/digital-garden" className="hover:underline">
            Garden
          </Link>
          <Link href="/lifestyle" className="hover:underline">
            Lifestyle
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}
