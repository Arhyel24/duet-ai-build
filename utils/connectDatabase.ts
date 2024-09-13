// utils/connectToDb.ts
import mongoose, { Connection } from "mongoose";
import { GridFSBucket } from "mongodb";

let client: Connection | null = null;
let bucket: GridFSBucket | null = null;

const MONGODB_URI = process.env.MONGODB_URI as string;

interface DbConnection {
  client: Connection;
  bucket: GridFSBucket;
}

async function connectToDb() {
  await mongoose.connect(MONGODB_URI);

  console.log("Connected to the Database");
}

export default connectToDb;
