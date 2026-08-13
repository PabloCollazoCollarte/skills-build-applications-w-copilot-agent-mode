import express, { Router, Request, Response } from 'express';
import { Workout } from '../models';

const router: Router = express.Router();

// GET all workouts
router.get('/', async (req: Request, res: Response) => {
  const workouts = await Workout.find().sort({ createdAt: -1 }).lean();
  res.json({ message: 'Get all workouts', data: workouts });
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const workout = await Workout.findById(id).lean();
  res.json({ message: `Get workout ${id}`, data: workout ?? {} });
});

// POST get personalized workout suggestions
router.post('/suggestions', async (req: Request, res: Response) => {
  const { body } = req;
  const targetLevel = body?.fitnessLevel ?? 'Beginner';
  const suggestions = await Workout.find({ difficulty: targetLevel === 'Advanced' ? { $in: ['Moderate', 'Hard'] } : { $in: ['Easy', 'Moderate'] } }).limit(3).lean();
  res.json({ message: 'Get personalized workout suggestions', data: suggestions });
});

// GET workout suggestions for user
router.get('/user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const suggestions = await Workout.find({ userId }).sort({ createdAt: -1 }).lean();
  res.json({ message: `Get workout suggestions for user ${userId}`, data: suggestions });
});

// POST create new workout plan
router.post('/', async (req: Request, res: Response) => {
  const { body } = req;
  const workout = await Workout.create(body);
  res.status(201).json({ message: 'Workout plan created', data: workout });
});

// PUT update workout plan
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const workout = await Workout.findByIdAndUpdate(id, body, { new: true });
  res.json({ message: `Workout plan ${id} updated`, data: workout });
});

// DELETE workout plan
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Workout.findByIdAndDelete(id);
  res.json({ message: `Workout plan ${id} deleted` });
});

export default router;
