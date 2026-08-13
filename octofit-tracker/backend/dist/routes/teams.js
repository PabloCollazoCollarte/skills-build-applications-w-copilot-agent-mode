"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
// GET all teams
router.get('/', async (req, res) => {
    const teams = await models_1.Team.find().lean();
    res.json({ message: 'Get all teams', data: teams });
});
// GET team by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const team = await models_1.Team.findById(id).lean();
    res.json({ message: `Get team ${id}`, data: team ?? {} });
});
// POST create new team
router.post('/', async (req, res) => {
    const { body } = req;
    const team = await models_1.Team.create(body);
    res.status(201).json({ message: 'Team created', data: team });
});
// PUT update team
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const team = await models_1.Team.findByIdAndUpdate(id, body, { new: true });
    res.json({ message: `Team ${id} updated`, data: team });
});
// DELETE team
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await models_1.Team.findByIdAndDelete(id);
    res.json({ message: `Team ${id} deleted` });
});
// POST add member to team
router.post('/:id/members', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const team = await models_1.Team.findById(id);
    if (!team) {
        return res.status(404).json({ message: 'Team not found', data: {} });
    }
    const user = await models_1.User.findById(userId);
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
exports.default = router;
