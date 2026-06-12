// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import authRoutes from "./routes/authRoutes.js";   
import verifyToken from "./middleware/authMiddleware.js"; 

// .env config
dotenv.config();

const app = express();

// middleware order matters
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from this origin
}));
app.use(express.json());
app.use(rateLimiter); // Apply rate limiter to all routes

// routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", verifyToken, notesRouter);

const PORT = process.env.PORT || 5001;

// start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Example app listening at:", PORT);
  });
});
