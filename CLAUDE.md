@AGENTS.md

# 링크나무 (link in bio 서비스)

## 프로젝트 개요
Linktree처럼 내 모든 링크를 한 페이지에 모아 두고 하나의 URL로 공유할 수 있는 서비스입니다.

## 기술 스택
- Next.js 16 (App Router, Cache Components 활성화)
- Tailwind CSS v4
- MongoDB Atlas (클릭 수 저장)
- Vercel (배포)

## 주요 기능
- 프로필 표시 (이름, 소개, 사진)
- 링크 카드 목록
- 링크 클릭 수 집계

## 코드 규칙
- TypeScript 사용
- 컴포넌트는 `src/components/` 아래에 작성
- 환경변수는 `.env.local`에 저장 (절대 커밋하지 않음). 새 변수를 추가하면 `.env.example`에도 키를 추가
- 모바일 우선 반응형 디자인 (기본 스타일 = 모바일, `sm:` 이상에서 확장)

## 구조
- `src/data/profile.ts` — 프로필·링크 데이터 (페이지 내용은 여기서 수정)
- `src/app/go/[id]/route.ts` — 클릭 기록 후 원래 URL로 302 리다이렉트
- `src/app/api/stats/route.ts` — 링크별 클릭 수 (Bearer `STATS_TOKEN` 필요)
- `src/lib/mongodb.ts` — Mongo 클라이언트 싱글턴, `src/lib/clicks.ts` — 집계 쿼리

## 주의사항
- 링크 카드는 `next/link`가 아닌 `<a>`를 사용 (prefetch가 `/go/[id]`를 호출해 집계를 부풀리는 것을 방지)
- 클릭 증가는 `$inc` + `upsert`로만 처리 (읽고-더하고-쓰기 금지)
- 링크 `id`는 집계 키이므로 변경하면 기존 집계와 분리됨
