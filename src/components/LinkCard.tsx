import type { LinkItem } from "@/data/profile";
import LinkIcon from "./LinkIcon";

// next/link 대신 일반 <a>를 씁니다.
// next/link는 링크를 미리 불러오는(prefetch) 동작이 있어, 클릭하지 않아도 /go/[id]가 호출되면 집계가 부풀려집니다.
export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <li className="relative">
      <span
        aria-hidden="true"
        className="absolute -left-[21px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-accent bg-background"
      />
      <a
        href={`/go/${link.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:gap-4 sm:p-4"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <LinkIcon name={link.icon} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[15px] font-bold">{link.label}</span>
          {link.description && (
            <span className="truncate text-[13px] text-muted">{link.description}</span>
          )}
        </span>
        <span aria-hidden="true" className="text-muted transition group-hover:text-accent">
          ↗
        </span>
        <span className="sr-only">(새 탭에서 열림)</span>
      </a>
    </li>
  );
}
