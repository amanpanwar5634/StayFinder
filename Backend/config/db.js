import mongoose from "mongoose";
export const connectDb=async()=>{
   await  mongoose.connect('mongodb+srv://amanpanwar123op:9645145634@cluster0.zvd16og.mongodb.net/StayFinder')
    .then(()=>{console.log("database connected")});
}