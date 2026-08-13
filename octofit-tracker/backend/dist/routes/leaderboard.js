"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET global leaderboard
router.get('/', (req, res) => {
    res.json({ message: 'Get global leaderboard', data: [] });
});
// GET team leaderboard
router.get('/team/:teamId', (req, res) => {
    const { teamId } = req.params;
    res.json({ message: `Get leaderboard for team ${teamId}`, data: [] });
});
// GET leaderboard by activity type
router.get('/activity/:activityType', (req, res) => {
    const { activityType } = req.params;
    res.json({ message: `Get leaderboard for activity type ${activityType}`, data: [] });
});
// GET user rank
router.get('/rank/:userId', (req, res) => {
    const { userId } = req.params;
    res.json({ message: `Get rank for user ${userId}`, data: {} });
});
exports.default = router;
