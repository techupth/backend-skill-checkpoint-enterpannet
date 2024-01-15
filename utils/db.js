import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "test-what-is-it";
export async function connect() {
  await client.connect();
}
function getDB() {
  return client.db(dbName);
}
export function getCollection(collectionName) {
  const db = getDB();
  return db.collection(collectionName);
}
export function close() {
  client.close();
}
