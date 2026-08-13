"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
// GET all activities
router.get('/', async (req, res) => {
    const activities = await models_1.Activity.find().sort({ date: -1 }).lean();
    res.json({ message: 'Get all activities', data: activities });
});
// GET activity by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const activity = await models_1.Activity.findById(id).lean();
    res.json({ message: `Get activity ${id}`, data: activity ?? {} });
});
// POST create new activity log
router.post('/', async (req, res) => {
    const { body } = req;
    const activity = await models_1.Activity.create(body);
    res.status(201).json({ message: 'Activity logged', data: activity });
});
// PUT update activity
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const activity = await models_1.Activity.findByIdAndUpdate(id, body, { new: true });
    res.json({ message: `Activity ${id} updated`, data: activity });
});
// DELETE activity
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await models_1.Activity.findByIdAndDelete(id);
    res.json({ message: `Activity ${id} deleted` });
});
// GET activities by user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const activities = await models_1.Activity.find({ userId }).sort({ date: -1 }).lean();
    res.json({ message: `Get activities for user ${userId}`, data: activities });
});
exports.default = router;
