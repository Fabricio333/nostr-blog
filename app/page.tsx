import Image from 'next/image';
import settings from '../settings.json';
import { fetchProfile, fetchNotes } from '../lib/nostr';
import LatestPostsCarousel from '../components/LatestPostsCarousel';

export default async function HomePage() {
  const profile = await fetchProfile(settings.npub);
  const notes = await fetchNotes(settings.npub, 20);

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="w-full md:w-1/3 space-y-4 text-center flex flex-col items-center">
        {profile.picture && (
          <Image
            src={profile.picture}
            alt="Profile picture"
            width={128}
            height={128}
            className="rounded-full object-cover"
          />
        )}
        <p className="whitespace-pre-wrap text-sm md:text-base">
          {profile.about || settings.bio}
        </p>
      </div>
      <div className="w-full md:w-2/3">
        <LatestPostsCarousel notes={notes} />
      </div>
    </div>
  );
}
