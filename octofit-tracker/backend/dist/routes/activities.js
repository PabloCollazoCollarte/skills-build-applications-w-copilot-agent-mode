"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all activities
router.get('/', (req, res) => {
    res.json({ message: 'Get all activities', data: [] });
});
// GET activity by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get activity ${id}`, data: {} });
});
// POST create new activity log
router.post('/', (req, res) => {
    const { body } = req;
    res.status(201).json({ message: 'Activity logged', data: body });
});
// PUT update activity
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({ message: `Activity ${id} updated`, data: body });
});
// DELETE activity
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Activity ${id} deleted` });
});
// GET activities by user
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    res.json({ message: `Get activities for user ${userId}`, data: [] });
});
exports.default = router;
