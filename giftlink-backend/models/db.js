// db.js
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

const dbName = "giftdb";

let dbInstance = null;

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected to MongoDB");

    dbInstance = client.db(dbName); // Assign to global dbInstance
    return dbInstance;
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    throw error;
  }
}

module.exports = connectToDatabase;
