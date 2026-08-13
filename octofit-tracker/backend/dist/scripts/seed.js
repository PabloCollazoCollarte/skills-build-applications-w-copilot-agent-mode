"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        const collections = ['users', 'teams', 'activities', 'leaderboards', 'workouts'];
        for (const collectionName of collections) {
            const collection = mongoose_1.default.connection.collection(collectionName);
            await collection.deleteMany({});
        }
        const teamA = await models_1.Team.create({
            name: 'Rocket Runners',
            sport: 'Track and Field',
            coach: 'Coach Rivera',
            points: 1450,
            memberIds: []
        });
        const teamB = await models_1.Team.create({
            name: 'Power Pacers',
            sport: 'Cross Training',
            coach: 'Coach Singh',
            points: 1325,
            memberIds: []
        });
        const userOne = await models_1.User.create({
            name: 'Mila Torres',
            email: 'mila.torres@example.com',
            username: 'mila',
            age: 16,
            fitnessLevel: 'Advanced',
            teamId: teamA._id,
            goals: ['Improve endurance', 'Train for 5K'],
            createdAt: new Date()
        });
        const userTwo = await models_1.User.create({
            name: 'Aiden Brooks',
            email: 'aiden.brooks@example.com',
            username: 'aiden',
            age: 15,
            fitnessLevel: 'Intermediate',
            teamId: teamA._id,
            goals: ['Build stamina', 'Increase strength'],
            createdAt: new Date()
        });
        const userThree = await models_1.User.create({
            name: 'Sofia Nguyen',
            email: 'sofia.nguyen@example.com',
            username: 'sofia',
            age: 17,
            fitnessLevel: 'Intermediate',
            teamId: teamB._id,
            goals: ['Stay consistent', 'Lift more weight'],
            createdAt: new Date()
        });
        const userFour = await models_1.User.create({
            name: 'Leo Martinez',
            email: 'leo.martinez@example.com',
            username: 'leo',
            age: 16,
            fitnessLevel: 'Beginner',
            teamId: teamB._id,
            goals: ['Walk more daily', 'Learn mobility'],
            createdAt: new Date()
        });
        await models_1.Team.updateMany({ _id: { $in: [teamA._id, teamB._id] } }, { $set: { memberIds: [userOne._id, userTwo._id, userThree._id, userFour._id] } });
        const activities = await models_1.Activity.insertMany([
            {
                userId: userOne._id,
                teamId: teamA._id,
                type: 'Running',
                durationMinutes: 38,
                distanceKm: 6.2,
                caloriesBurned: 420,
                date: new Date('2026-08-10T06:30:00Z'),
                notes: 'Tempo run with a strong finish.'
            },
            {
                userId: userTwo._id,
                teamId: teamA._id,
                type: 'Strength',
                durationMinutes: 45,
                caloriesBurned: 310,
                date: new Date('2026-08-11T17:00:00Z'),
                notes: 'Lower-body focus and core work.'
            },
            {
                userId: userThree._id,
                teamId: teamB._id,
                type: 'Walking',
                durationMinutes: 50,
                distanceKm: 4.8,
                caloriesBurned: 280,
                date: new Date('2026-08-09T18:00:00Z'),
                notes: 'Evening walk with steady pace.'
            },
            {
                userId: userFour._id,
                teamId: teamB._id,
                type: 'Yoga',
                durationMinutes: 25,
                caloriesBurned: 120,
                date: new Date('2026-08-12T07:15:00Z'),
                notes: 'Mobility and stretching recovery.'
            }
        ]);
        await models_1.Leaderboard.insertMany([
            {
                userId: userOne._id,
                teamId: teamA._id,
                score: 980,
                rank: 1,
                activityType: 'Running',
                updatedAt: new Date()
            },
            {
                userId: userTwo._id,
                teamId: teamA._id,
                score: 860,
                rank: 2,
                activityType: 'Strength',
                updatedAt: new Date()
            },
            {
                userId: userThree._id,
                teamId: teamB._id,
                score: 790,
                rank: 3,
                activityType: 'Walking',
                updatedAt: new Date()
            },
            {
                userId: userFour._id,
                teamId: teamB._id,
                score: 740,
                rank: 4,
                activityType: 'Yoga',
                updatedAt: new Date()
            }
        ]);
        await models_1.Workout.insertMany([
            {
                userId: userOne._id,
                name: '5K Builder',
                focus: 'Endurance',
                durationMinutes: 35,
                difficulty: 'Moderate',
                exercises: ['Warm-up jog', 'Intervals', 'Cool-down stride'],
                createdAt: new Date()
            },
            {
                userId: userTwo._id,
                name: 'Strength Circuit',
                focus: 'Leg power',
                durationMinutes: 40,
                difficulty: 'Hard',
                exercises: ['Squats', 'Lunges', 'Deadlifts', 'Planks'],
                createdAt: new Date()
            },
            {
                userId: userThree._id,
                name: 'Recovery Flow',
                focus: 'Mobility',
                durationMinutes: 30,
                difficulty: 'Easy',
                exercises: ['Stretch', 'Breathing', 'Balance work'],
                createdAt: new Date()
            },
            {
                userId: userFour._id,
                name: 'Daily Walk Boost',
                focus: 'Consistency',
                durationMinutes: 28,
                difficulty: 'Easy',
                exercises: ['Walk intervals', 'Mobility reset', 'Core activation'],
                createdAt: new Date()
            }
        ]);
        console.log('Database seeding complete');
        console.log('Seeded users:', await models_1.User.countDocuments());
        console.log('Seeded teams:', await models_1.Team.countDocuments());
        console.log('Seeded activities:', await models_1.Activity.countDocuments());
        console.log('Seeded leaderboard entries:', await models_1.Leaderboard.countDocuments());
        console.log('Seeded workouts:', await models_1.Workout.countDocuments());
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
