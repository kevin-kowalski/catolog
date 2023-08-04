import express from 'express';
import cors from 'cors';
import router from './router';
import connectDb from './models/index.m';

// Constants
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(router);

// Function to connect to the database and start the server
const run = async () => {
  await connectDb();
  console.log('>> Connected to database');
  app.listen(PORT, () => {
    console.log(`>> Server running on port ${PORT}`);
  });
};

// Run the function to start the server
run();

export default app;