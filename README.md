# 링크나무

내 모든 링크를 한 페이지에 모으고, 링크별 클릭 수를 집계하는 link-in-bio 서비스입니다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev                   # http://localhost:3000
```

## 환경변수 (`.env.local`)

| 키 | 설명 |
|---|---|
| `MONGODB_URI` | MongoDB Atlas 연결 문자열 (Atlas > Connect > Drivers) |
| `MONGODB_DB` | 데이터베이스 이름 (기본값 `linknamu`) |
| `STATS_TOKEN` | `/api/stats` 조회용 비밀 토큰 |

## 내용 수정

`src/data/profile.ts`에서 이름, 소개, 사진, 링크를 수정합니다.
프로필 사진은 `public/`에 넣고 `photo: "/profile.jpg"`처럼 지정합니다.

## 클릭 집계 방식

1. 링크 카드는 `/go/<링크id>`로 연결됩니다.
2. 서버가 원래 URL로 즉시 302 리다이렉트합니다.
3. 응답 후 MongoDB `clicks` 컬렉션에 `$inc`로 1을 더합니다.

```json
{ "_id": "instagram", "count": 42, "lastClickedAt": "2026-10-11T09:00:00Z" }
```

조회:

```bash
curl -H "Authorization: Bearer $STATS_TOKEN" https://<도메인>/api/stats
```

## Vercel 배포

1. GitHub에 푸시 후 Vercel에서 Import
2. Project Settings > Environment Variables에 위 3개 키 등록
3. MongoDB Atlas > Network Access에서 Vercel 접속 허용 (서버리스는 고정 IP가 없어 `0.0.0.0/0` 허용이 일반적이며, 이 경우 강한 DB 비밀번호 필수)
