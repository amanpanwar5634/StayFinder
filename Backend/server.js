import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDb } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerk.js";
import userRouter from "./routes/userRoute.js";
import hotelRouter from "./routes/HotelRoute.js";
import { connectCloudinary } from "./config/cloudinary.js";
import roomRouter from "./routes/RoomRoute.js";
import bookingRouter from "./routes/BookingRoute.js";
const app = express();
const port = 4000;

// DB connection
connectDb();
connectCloudinary();//connect cloudinary
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
app.use('/api/user',userRouter);
app.use('/api/hotels',hotelRouter);
app.use('/api/rooms',roomRouter);
app.use('/api/bookings',bookingRouter);
// Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
