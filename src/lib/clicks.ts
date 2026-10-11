import "server-only";
import { getDb } from "./mongodb";

type ClickDoc = {
  _id: string; // 링크 id
  count: number;
  lastClickedAt: Date;
};

const COLLECTION = "clicks";

/** 링크 클릭 1회 기록. $inc는 원자적이라 동시 클릭에도 누락이 없습니다. */
export async function recordClick(linkId: string): Promise<void> {
  const db = await getDb();
  await db.collection<ClickDoc>(COLLECTION).updateOne(
    { _id: linkId },
    { $inc: { count: 1 }, $set: { lastClickedAt: new Date() } },
    { upsert: true },
  );
}

/** 링크별 누적 클릭 수 */
export async function getClickCounts(): Promise<Record<string, number>> {
  const db = await getDb();
  const docs = await db.collection<ClickDoc>(COLLECTION).find({}).toArray();
  return Object.fromEntries(docs.map((d) => [d._id, d.count]));
}
