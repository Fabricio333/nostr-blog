import Image from 'next/image';
import settings from '../settings.json';
import { fetchProfile, fetchNotes } from '../lib/nostr';
import VerticalCarousel from '../components/VerticalCarousel';

export default async function HomePage() {
  const profile = await fetchProfile(settings.npub);
  const notes = await fetchNotes(settings.npub, 20);

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-start">
      <div className="flex flex-col items-center space-y-4">
        {profile.picture && (
          <Image
            src={profile.picture}
            alt="Profile picture"
            width={200}
            height={200}
            className="rounded-full object-cover"
          />
        )}
        <p className="text-lg text-center whitespace-pre-line">
          {profile.about || settings.bio}
        </p>
      </div>
      <div className="h-80">
        <VerticalCarousel notes={notes} />
      </div>
    </div>
  );
}
