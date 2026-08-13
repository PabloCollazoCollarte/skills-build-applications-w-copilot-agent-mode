import express, { Router, Request, Response } from 'express';
import { Team, User } from '../models';

const router: Router = express.Router();

// GET all teams
router.get('/', async (req: Request, res: Response) => {
  const teams = await Team.find().lean();
  res.json({ message: 'Get all teams', data: teams });
});

// GET team by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await Team.findById(id).lean();
  res.json({ message: `Get team ${id}`, data: team ?? {} });
});

// POST create new team
router.post('/', async (req: Request, res: Response) => {
  const { body } = req;
  const team = await Team.create(body);
  res.status(201).json({ message: 'Team created', data: team });
});

// PUT update team
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const team = await Team.findByIdAndUpdate(id, body, { new: true });
  res.json({ message: `Team ${id} updated`, data: team });
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Team.findByIdAndDelete(id);
  res.json({ message: `Team ${id} deleted` });
});

// POST add member to team
router.post('/:id/members', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  const team = await Team.findById(id);
  if (!team) {
    return res.status(404).json({ message: 'Team not found', data: {} });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found', data: {} });
  }

  if (!team.memberIds.some((member) => member.toString() === userId)) {
    team.memberIds.push(user._id);
    user.teamId = team._id;
    await team.save();
    await user.save();
  }

  res.status(201).json({ message: `Member added to team ${id}`, data: { team, user } });
});

export default router;
