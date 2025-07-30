import { fetchPosts } from '../../lib/nostr';
import settings from '../../settings.json';
import PostCard from '../../components/PostCard';

export default async function BlogIndex() {
  const posts = await fetchPosts(settings.npub);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Blog Posts</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
