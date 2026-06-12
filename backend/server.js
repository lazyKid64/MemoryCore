// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

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

// Serve frontend static files in production
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5001;

// start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Example app listening at:", PORT);
  });
});
