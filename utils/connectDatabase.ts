// utils/connectToDb.ts
import mongoose, { Connection } from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI as string;

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    // console.log("Connected to the Database");
  } catch (error) {
    console.log("Error connecting DB: ", error);
  }
};

export default connectToDb;
