import { MongoClient, type Db } from "mongodb";

// 서버리스(Vercel) 환경에서 요청마다 새 연결을 만들지 않도록
// 클라이언트를 전역에 한 번만 만들어 재사용합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경변수가 없습니다. .env.local을 확인하세요.");
  }
  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri, { maxPoolSize: 5 });
    globalForMongo._mongoClientPromise = client.connect().catch((err) => {
      // 실패한 연결을 캐시에 남기면 이후 요청이 계속 실패하므로 비워서 다음 요청에 재시도
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB || "linknamu");
}
