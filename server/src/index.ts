import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import commentsRoutes from './routes/Comments';

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', //frontend dev server
  }),
);

app.use('/comments', commentsRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI!;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(console.error);
