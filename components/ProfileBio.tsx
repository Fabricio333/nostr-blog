import Image from 'next/image';

interface ProfileBioProps {
  profile: Record<string, any>;
  bio: string;
}

export default function ProfileBio({ profile, bio }: ProfileBioProps) {
  return (
    <div className="space-y-4">
      {profile.picture && (
        <Image
          src={profile.picture}
          alt="Profile picture"
          width={128}
          height={128}
          className="mx-auto rounded-full object-cover"
        />
      )}
      <p className="whitespace-pre-wrap text-sm md:text-base">
        {profile.about || bio}
      </p>
    </div>
  );
}
