import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "khoirunnada";

if (!uri) {
  throw new Error("MONGODB_URI belum diatur di .env.local");
}

let cachedClient = null;
let cachedDb = null;

export async function connectToMongoDB() {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  const client = new MongoClient(uri);

  await client.connect();

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return {
    client,
    db,
  };
}