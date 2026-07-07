import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Check that the environment variable exists
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing from your .env file.");
  process.exit(1);
}

// Create the MongoDB client
const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {
  try {
    // Connect to MongoDB Atlas
    await client.connect();
    console.log(" Connected to MongoDB Atlas");

    const db = client.db("cse341");
    const professionalCollection = db.collection("professional");

    // Test route
    app.get("/", (req, res) => {
      res.send("API is running");
    });

    // Get professional data from my cluster doc
    app.get("/professional", async (req, res) => {
      try {
        const data = await professionalCollection.findOne({});

        if (!data) {
          return res.status(404).json({
            message: "No professional document found."
          });
        }

        res.json(data);
      } catch (error) {
        console.error("Error fetching professional data:", error);
        res.status(500).json({
          message: "Internal Server Error"
        });
      }
    });

    // Start Express
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

startServer();