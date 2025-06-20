import express from "express"
import "dotenv/config";
import cors from "cors"
import { connectDb } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerk.js";
//app config
const app=express();
const port=4000;

//middleware
app.use(express.json());
app.use(cors()); //allow backend to connect with frontend
app.use(clerkMiddleware());
app.use("/api/clerk",clerkWebhooks);
//dv connnection
connectDb();
app.get("/",(req,res)=>{
    res.send("api working successfully");
})
 
app.listen(port,()=>{
    console.log(`app is listening on http://localhost:${port}`);
})
