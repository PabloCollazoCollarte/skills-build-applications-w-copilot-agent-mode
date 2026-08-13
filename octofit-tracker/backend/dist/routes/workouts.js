"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all workouts
router.get('/', (req, res) => {
    res.json({ message: 'Get all workouts', data: [] });
});
// GET workout by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get workout ${id}`, data: {} });
});
// POST get personalized workout suggestions
router.post('/suggestions', (req, res) => {
    const { body } = req;
    res.json({ message: 'Get personalized workout suggestions', data: body });
});
// GET workout suggestions for user
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    res.json({ message: `Get workout suggestions for user ${userId}`, data: [] });
});
// POST create new workout plan
router.post('/', (req, res) => {
    const { body } = req;
    res.status(201).json({ message: 'Workout plan created', data: body });
});
// PUT update workout plan
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({ message: `Workout plan ${id} updated`, data: body });
});
// DELETE workout plan
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Workout plan ${id} deleted` });
});
exports.default = router;
