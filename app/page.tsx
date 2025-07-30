import settings from '../settings.json';
import { fetchProfile, fetchNotes } from '../lib/nostr';
import PostCard from '../components/PostCard';
import ProfileBio from '../components/ProfileBio';

export default async function HomePage() {
  const profile = await fetchProfile(settings.npub);
  const notes = await fetchNotes(settings.npub, 20);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 md:grid-cols-3">
      <aside className="col-span-1 space-y-4 text-center">
        <ProfileBio profile={profile} bio={settings.bio} />
      </aside>
      <section className="col-span-2 space-y-4">
        <h2 className="text-2xl font-bold text-accent">Latest Posts</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {notes.map((n) => (
            <PostCard key={n.id} post={n} />
          ))}
        </div>
      </section>
    </div>
  );
}
