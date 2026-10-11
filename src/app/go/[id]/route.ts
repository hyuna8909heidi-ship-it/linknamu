import { NextResponse, after, connection, type NextRequest } from "next/server";
import { findLink } from "@/data/profile";
import { recordClick } from "@/lib/clicks";

// 링크 카드는 /go/<id>로 연결됩니다.
// 1) 원래 URL로 즉시 리다이렉트하고
// 2) 응답이 나간 뒤(after) 클릭 수를 기록합니다. DB가 느리거나 실패해도 방문자는 기다리지 않습니다.
export async function GET(_req: NextRequest, ctx: RouteContext<"/go/[id]">) {
  await connection(); // 빌드 시 프리렌더 방지: 항상 요청 시점에 실행

  const { id } = await ctx.params;
  const link = findLink(id);
  if (!link) {
    return NextResponse.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  after(async () => {
    try {
      await recordClick(link.id);
    } catch (err) {
      console.error("[clicks] 기록 실패:", link.id, err);
    }
  });

  const res = NextResponse.redirect(link.url, 302);
  res.headers.set("Cache-Control", "no-store"); // 캐시되면 재클릭이 집계되지 않음
  return res;
}
