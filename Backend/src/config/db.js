import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DBconnection = async () => {
  try {
    if (!process.env.DBURL) {
      throw new Error("Database URL is not defined in environment variables");
    }
    await mongoose.connect(process.env.DBURL);
    console.log("DB Connected");
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

export default DBconnection;
