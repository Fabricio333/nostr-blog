import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 border-b flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/digital-garden">Garden</Link>
      <Link href="/lifestyle">Lifestyle</Link>
      <Link href="/contact">Contact</Link>
    </header>
  );
}
