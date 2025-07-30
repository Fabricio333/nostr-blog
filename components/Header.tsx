import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          Nostr Blog
        </Link>
        <nav className="flex gap-4 text-sm font-medium">
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
        </nav>
      </div>
    </header>
  );
}
