// 프로필과 링크 목록. 이 파일만 고치면 페이지 내용이 바뀝니다.
// 링크 id는 클릭 집계 키로 쓰이므로, 한 번 정한 뒤에는 바꾸지 않는 것이 좋습니다.

export type LinkIconName = "instagram" | "blog" | "github" | "youtube" | "link";

export type LinkItem = {
  /** 집계 키이자 /go/[id] 경로. 영문 소문자·숫자·하이픈만 사용 */
  id: string;
  label: string;
  description?: string;
  url: string;
  icon: LinkIconName;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로(예: "/profile.jpg"). 비우면 이름 첫 글자 아바타 표시 */
  photo?: string;
};

export const profile: Profile = {
  name: "홍길동",
  bio: "와인과 커피, 여행을 좋아합니다",
  photo: "",
};

// 아래 URL은 예시입니다. 실제 계정 주소로 바꿔 주세요.
export const links: LinkItem[] = [
  { id: "instagram", label: "Instagram", description: "일상과 여행 사진", url: "https://www.instagram.com/", icon: "instagram" },
  { id: "blog", label: "블로그", description: "와인·커피 기록", url: "https://blog.naver.com/", icon: "blog" },
  { id: "github", label: "GitHub", description: "사이드 프로젝트", url: "https://github.com/", icon: "github" },
  { id: "youtube", label: "YouTube", description: "여행 브이로그", url: "https://www.youtube.com/", icon: "youtube" },
];

export function findLink(id: string): LinkItem | undefined {
  return links.find((l) => l.id === id);
}
