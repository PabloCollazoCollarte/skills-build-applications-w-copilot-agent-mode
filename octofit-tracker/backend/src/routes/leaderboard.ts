import express, { Router, Request, Response } from 'express';
import { Leaderboard } from '../models';

const router: Router = express.Router();

// GET global leaderboard
router.get('/', async (req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find().sort({ score: -1 }).lean();
  res.json({ message: 'Get global leaderboard', data: leaderboard });
});

// GET team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const leaderboard = await Leaderboard.find({ teamId }).sort({ score: -1 }).lean();
  res.json({ message: `Get leaderboard for team ${teamId}`, data: leaderboard });
});

// GET leaderboard by activity type
router.get('/activity/:activityType', async (req: Request, res: Response) => {
  const { activityType } = req.params;
  const leaderboard = await Leaderboard.find({ activityType }).sort({ score: -1 }).lean();
  res.json({ message: `Get leaderboard for activity type ${activityType}`, data: leaderboard });
});

// GET user rank
router.get('/rank/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const ranking = await Leaderboard.find({ userId }).sort({ score: -1 }).lean();
  res.json({ message: `Get rank for user ${userId}`, data: ranking[0] ?? {} });
});

export default router;
