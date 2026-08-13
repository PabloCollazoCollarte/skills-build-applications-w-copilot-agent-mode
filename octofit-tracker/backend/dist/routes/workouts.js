"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
// GET all workouts
router.get('/', async (req, res) => {
    const workouts = await models_1.Workout.find().sort({ createdAt: -1 }).lean();
    res.json({ message: 'Get all workouts', data: workouts });
});
// GET workout by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const workout = await models_1.Workout.findById(id).lean();
    res.json({ message: `Get workout ${id}`, data: workout ?? {} });
});
// POST get personalized workout suggestions
router.post('/suggestions', async (req, res) => {
    const { body } = req;
    const targetLevel = body?.fitnessLevel ?? 'Beginner';
    const suggestions = await models_1.Workout.find({ difficulty: targetLevel === 'Advanced' ? { $in: ['Moderate', 'Hard'] } : { $in: ['Easy', 'Moderate'] } }).limit(3).lean();
    res.json({ message: 'Get personalized workout suggestions', data: suggestions });
});
// GET workout suggestions for user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const suggestions = await models_1.Workout.find({ userId }).sort({ createdAt: -1 }).lean();
    res.json({ message: `Get workout suggestions for user ${userId}`, data: suggestions });
});
// POST create new workout plan
router.post('/', async (req, res) => {
    const { body } = req;
    const workout = await models_1.Workout.create(body);
    res.status(201).json({ message: 'Workout plan created', data: workout });
});
// PUT update workout plan
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const workout = await models_1.Workout.findByIdAndUpdate(id, body, { new: true });
    res.json({ message: `Workout plan ${id} updated`, data: workout });
});
// DELETE workout plan
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await models_1.Workout.findByIdAndDelete(id);
    res.json({ message: `Workout plan ${id} deleted` });
});
exports.default = router;
