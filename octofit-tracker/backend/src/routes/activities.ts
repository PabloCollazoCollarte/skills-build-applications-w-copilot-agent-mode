import express, { Router, Request, Response } from 'express';
import { Activity } from '../models';

const router: Router = express.Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  const activities = await Activity.find().sort({ date: -1 }).lean();
  res.json({ message: 'Get all activities', data: activities });
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const activity = await Activity.findById(id).lean();
  res.json({ message: `Get activity ${id}`, data: activity ?? {} });
});

// POST create new activity log
router.post('/', async (req: Request, res: Response) => {
  const { body } = req;
  const activity = await Activity.create(body);
  res.status(201).json({ message: 'Activity logged', data: activity });
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const activity = await Activity.findByIdAndUpdate(id, body, { new: true });
  res.json({ message: `Activity ${id} updated`, data: activity });
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Activity.findByIdAndDelete(id);
  res.json({ message: `Activity ${id} deleted` });
});

// GET activities by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const activities = await Activity.find({ userId }).sort({ date: -1 }).lean();
  res.json({ message: `Get activities for user ${userId}`, data: activities });
});

export default router;
