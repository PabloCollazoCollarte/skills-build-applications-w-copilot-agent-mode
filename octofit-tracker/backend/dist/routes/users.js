"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
// GET all users
router.get('/', async (req, res) => {
    const users = await models_1.User.find().lean();
    res.json({ message: 'Get all users', data: users });
});
// GET user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await models_1.User.findById(id).lean();
    res.json({ message: `Get user ${id}`, data: user ?? {} });
});
// POST create new user
router.post('/', async (req, res) => {
    const { body } = req;
    const createdUser = await models_1.User.create(body);
    res.status(201).json({ message: 'User created', data: createdUser });
});
// PUT update user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await models_1.User.findByIdAndUpdate(id, body, { new: true });
    res.json({ message: `User ${id} updated`, data: updatedUser });
});
// DELETE user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await models_1.User.findByIdAndDelete(id);
    res.json({ message: `User ${id} deleted` });
});
exports.default = router;
