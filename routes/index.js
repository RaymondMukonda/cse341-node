import { Router } from "express";
import { getDb } from "../data/database.js";

const router = Router();

// Test route on chrome
router.get("/", (req, res) => {
  res.send("API is running");
});

// Get professional data from MongoDB from my clusther id
router.get("/professional", async (req, res) => {
  try {
    const db = getDb();
    const professionalCollection = db.collection("professional");

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

export default router;
