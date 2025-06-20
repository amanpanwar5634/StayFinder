import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDb } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerk.js";

const app = express();
const port = 4000;

// DB connection
connectDb();

// CORS
app.use(cors());

// Webhook route first (must use raw body!)
app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);

// JSON parser for other routes
app.use(express.json());

// Clerk middleware (optional if using Clerk for auth-protected routes)
app.use(clerkMiddleware());

// Sample route
app.get("/", (req, res) => {
  res.send("API working successfully");
});

// Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
