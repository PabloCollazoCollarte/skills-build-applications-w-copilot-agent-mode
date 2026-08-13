"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
// GET global leaderboard
router.get('/', async (req, res) => {
    const leaderboard = await models_1.Leaderboard.find().sort({ score: -1 }).lean();
    res.json({ message: 'Get global leaderboard', data: leaderboard });
});
// GET team leaderboard
router.get('/team/:teamId', async (req, res) => {
    const { teamId } = req.params;
    const leaderboard = await models_1.Leaderboard.find({ teamId }).sort({ score: -1 }).lean();
    res.json({ message: `Get leaderboard for team ${teamId}`, data: leaderboard });
});
// GET leaderboard by activity type
router.get('/activity/:activityType', async (req, res) => {
    const { activityType } = req.params;
    const leaderboard = await models_1.Leaderboard.find({ activityType }).sort({ score: -1 }).lean();
    res.json({ message: `Get leaderboard for activity type ${activityType}`, data: leaderboard });
});
// GET user rank
router.get('/rank/:userId', async (req, res) => {
    const { userId } = req.params;
    const ranking = await models_1.Leaderboard.find({ userId }).sort({ score: -1 }).lean();
    res.json({ message: `Get rank for user ${userId}`, data: ranking[0] ?? {} });
});
exports.default = router;
