import { fetchPosts } from '../../lib/nostr';
import settings from '../../settings.json';

export default async function BlogIndex() {
  const posts = await fetchPosts(settings.npub);
  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Blog Posts</h1>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id} className="border p-2">
            {p.content}
          </li>
        ))}
      </ul>
    </main>
  );
}
