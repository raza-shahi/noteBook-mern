import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

connectDB();

// midleware
app.use(cors())
// app.use(cors({
//   origin:"http://localhost:5173/",
// }))
app.use(express.json());
app.use(rateLimiter)

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
});
