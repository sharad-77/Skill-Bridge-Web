import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();


const DatabaseURL = process.env.DBURL;

const DBconnection = async () => {
  try {
    if (!DatabaseURL) {
      throw new Error("Database URL is not defined in environment variables");
    }
    await mongoose.connect(DatabaseURL);
    console.log("DB Connected");
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

export default DBconnection;
