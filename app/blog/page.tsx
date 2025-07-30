import { fetchPosts } from '../../lib/nostr';
import settings from '../../settings.json';

export default async function BlogIndex() {
  const posts = await fetchPosts(settings.npub);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Blog Posts</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li
            key={p.id}
            className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-900"
          >
            {p.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
