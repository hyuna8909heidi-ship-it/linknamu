import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { links } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

// 링크별 클릭 수 조회 (소유자 전용)
// 사용법: curl -H "Authorization: Bearer $STATS_TOKEN" https://<도메인>/api/stats
function isAuthorized(req: NextRequest): boolean {
  const token = process.env.STATS_TOKEN;
  if (!token) return false;
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }
  try {
    const counts = await getClickCounts();
    const rows = links.map((l) => ({ id: l.id, label: l.label, clicks: counts[l.id] ?? 0 }));
    const total = rows.reduce((s, r) => s + r.clicks, 0);
    return NextResponse.json(
      { total, links: rows },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("[stats] 조회 실패:", err);
    return NextResponse.json({ error: "통계를 불러오지 못했습니다." }, { status: 500 });
  }
}
