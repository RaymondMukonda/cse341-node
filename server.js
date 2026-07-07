import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDb } from "./data/database.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Use the routes
app.use("/", router);

async function startServer() {
  try {
    await initDb(); // Initialize the database
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
