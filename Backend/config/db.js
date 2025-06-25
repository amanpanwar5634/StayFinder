import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amanpanwar123op:9645145634@cluster0.zvd16og.mongodb.net/StayFinder"
    );
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
 
  }
};
