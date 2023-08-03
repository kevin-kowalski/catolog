import express from 'express';
import cors from 'cors';
import router from './router';
import db from './models/index.m';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/', router);

const run = async () => {
  await db.mongoose.connect(db.url);
  console.log('>> Connected to database');
  app.listen(PORT, () => {
    console.log(`>> Server running on port ${PORT}`);
  });
};

run();