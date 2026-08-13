import express, { Router, Request, Response } from 'express';
import { User } from '../models';

const router: Router = express.Router();

// GET all users
router.get('/', async (req: Request, res: Response) => {
  const users = await User.find().lean();
  res.json({ message: 'Get all users', data: users });
});

// GET user by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).lean();
  res.json({ message: `Get user ${id}`, data: user ?? {} });
});

// POST create new user
router.post('/', async (req: Request, res: Response) => {
  const { body } = req;
  const createdUser = await User.create(body);
  res.status(201).json({ message: 'User created', data: createdUser });
});

// PUT update user
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
  res.json({ message: `User ${id} updated`, data: updatedUser });
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: `User ${id} deleted` });
});

export default router;
