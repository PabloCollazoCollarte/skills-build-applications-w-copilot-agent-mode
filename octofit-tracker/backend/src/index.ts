import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Express = express();
const PORT = 8000;
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
