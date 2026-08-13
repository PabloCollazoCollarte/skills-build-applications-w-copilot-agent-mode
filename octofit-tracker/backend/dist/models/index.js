"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.Leaderboard = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    goals: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    coach: { type: String, required: true },
    points: { type: Number, default: 0 },
    memberIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    type: { type: String, enum: ['Running', 'Walking', 'Strength', 'Cycling', 'Yoga'], required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: Number,
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
    notes: String
});
const leaderboardSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    activityType: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
});
const workoutSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'], required: true },
    exercises: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = { User: exports.User, Team: exports.Team, Activity: exports.Activity, Leaderboard: exports.Leaderboard, Workout: exports.Workout };
