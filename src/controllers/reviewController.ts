//myapp/src/controllers/reviewController.ts
import { Request, Response } from "express";
import { db } from "../config/mongo"; // Import MongoDB connection

export const getReviews = async (req: Request, res: Response) => {
  try {
    // Fetch all reviews, sorting by latest first
    const reviews = await db.collection("reviews").find().sort({ created_at: -1 }).toArray();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

export const addReview = async (req: Request, res: Response) => {
  const { username, comment, rating } = req.body;
  
  if (!username || !comment || !rating) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Insert the review into MongoDB
    await db.collection("reviews").insertOne({
      username,
      comment,
      rating,
      created_at: new Date(), // Store timestamp
    });

    console.log("Review added successfully");
    res.json({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ success: false, message: "Error adding review" });
  }
};
