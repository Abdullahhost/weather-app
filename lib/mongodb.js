import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_PASSWORD);
    console.log("Connected to db []");
  } catch (err) {
    console.log("Error to connect to Database", err);
  }
};


