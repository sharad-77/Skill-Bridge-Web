import mongoose from "mongoose";

const DBconnection = async () => {
  try{
    const connnection = await mongoose.connect(process.env.DBURL)
  } catch {
    console.log("error ocuured");
    console.error(error);  
  } finally {
     console.log("DB Connected");
  }
} 


export default DBconnection;