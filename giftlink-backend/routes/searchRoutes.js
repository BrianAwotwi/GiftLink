const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db");

// Search for gifts
router.get("/", async (req, res, next) => {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("gifts");

    // Initialize the query object
    let query = {};

    // Add the name filter to the query if the name parameter is not empty
    if (req.query.name && req.query.name.trim() !== "") {
      query.name = { $regex: req.query.name, $options: "i" }; // Case-insensitive regex search
    }

    // Add category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Add condition filter
    if (req.query.condition) {
      query.condition = req.query.condition;
    }

    // Add age filter
    if (req.query.age_years) {
      query.age_years = { $lte: parseInt(req.query.age_years) };
    }

    // Fetch filtered gifts
    const gifts = await collection.find(query).toArray();

    res.json(gifts);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
