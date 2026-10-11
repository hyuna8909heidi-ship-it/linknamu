import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center gap-2.5 text-center">
      <div className="relative grid h-[84px] w-[84px] place-items-center overflow-hidden rounded-full border-4 border-surface bg-accent text-3xl font-bold text-on-accent shadow-md sm:h-24 sm:w-24 sm:text-[34px]">
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={`${profile.name} 프로필 사진`}
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        ) : (
          <span aria-hidden="true">{profile.name.slice(0, 1)}</span>
        )}
      </div>
      <h1 className="mt-1.5 text-[21px] font-bold tracking-tight text-balance sm:text-2xl">
        {profile.name}
      </h1>
      <p className="max-w-[32ch] text-[14px] text-muted text-balance sm:text-[15px]">{profile.bio}</p>
    </header>
  );
}
