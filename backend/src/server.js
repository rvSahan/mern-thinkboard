import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5001;

dotenv.config();

// middleware
app.use(cors())
app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server is running on port:", port);
  });
});

