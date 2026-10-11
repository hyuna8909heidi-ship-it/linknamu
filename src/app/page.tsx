import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[440px] flex-col gap-7 px-4 py-8 sm:py-12">
      <ProfileHeader profile={profile} />

      {/* 왼쪽 세로선(줄기)에 링크 카드(가지)가 이어지는 구성 */}
      <ul
        aria-label="링크 목록"
        className="relative flex flex-col gap-3 pl-[22px] before:absolute before:top-2.5 before:bottom-2.5 before:left-1.5 before:w-0.5 before:rounded before:bg-line"
      >
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </ul>

      <footer className="text-center text-xs text-muted">
        <b className="font-bold text-accent">링크나무</b> · 하나의 URL로 모든 링크를
      </footer>
    </main>
  );
}
