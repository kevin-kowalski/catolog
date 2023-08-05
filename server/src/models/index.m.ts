import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Set the NODE_ENV variable to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment variables from the appropriate .env file
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
console.log(envFile);

dotenv.config({ path: envFile });

// Retrieve the database URL from the environment variables
const connectionString = process.env.DB_URL as string;

async function connectDb () {
  return await mongoose.connect(connectionString);
}

export default connectDb;
