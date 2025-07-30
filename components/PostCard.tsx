import { NostrPost } from '../lib/nostr';
import Card from './ui/Card';

export default function PostCard({ post }: { post: NostrPost }) {
  return (
    <Card className="p-4">
      <p className="whitespace-pre-wrap break-words">{post.content}</p>
    </Card>
  );
}
