import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DB_URL as string;

const db = {
  mongoose,
  url,
};

export default db;
