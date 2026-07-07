import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

let client;
let db;

const initDb = async () => {
  if (db) {
    console.log("Database is already initialized!");
    return db;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from your .env file.");
  }

  client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    db = client.db("cse341");
    return db;
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    throw error;
  }
};

const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized. Call initDb first.");
  }
  return db;
};

export { initDb, getDb };
