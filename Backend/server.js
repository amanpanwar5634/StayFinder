import express from "express"
import "dotenv/config";
import cors from "cors"
import { connectDb } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerk.js";
console.log("hi");
//dv connnection
connectDb();
//app config
const app=express();
const port=4000;
app.use(cors()); //allow backend to connect with frontend
//middleware
 
app.use(express.json());

app.use(clerkMiddleware());
 
app.use("/api/clerk", clerkWebhooks);
 
app.get("/",(req,res)=>{
    res.send("api working successfully");
})
 
app.listen(port,()=>{
    console.log(`app is listening on http://localhost:${port}`);
})
