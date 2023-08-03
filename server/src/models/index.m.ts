import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Retrieve the database URL from the environment variables
const url = process.env.DB_URL as string;

// Create an object that contains the Mongoose instance and the database URL
const db = {
  mongoose,
  url,
};

export default db;
