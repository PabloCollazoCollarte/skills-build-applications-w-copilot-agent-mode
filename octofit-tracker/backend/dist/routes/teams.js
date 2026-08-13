"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all teams
router.get('/', (req, res) => {
    res.json({ message: 'Get all teams', data: [] });
});
// GET team by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get team ${id}`, data: {} });
});
// POST create new team
router.post('/', (req, res) => {
    const { body } = req;
    res.status(201).json({ message: 'Team created', data: body });
});
// PUT update team
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({ message: `Team ${id} updated`, data: body });
});
// DELETE team
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Team ${id} deleted` });
});
// POST add member to team
router.post('/:id/members', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.status(201).json({ message: `Member added to team ${id}`, data: body });
});
exports.default = router;
