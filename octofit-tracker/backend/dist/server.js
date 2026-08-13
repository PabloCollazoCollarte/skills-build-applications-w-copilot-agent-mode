"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.API_BASE_URL = exports.CODESPACE_NAME = exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
exports.PORT = 8000;
exports.CODESPACE_NAME = process.env.CODESPACE_NAME;
exports.API_BASE_URL = exports.CODESPACE_NAME
    ? `https://${exports.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${exports.PORT}`;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const allowedOrigins = [
    exports.API_BASE_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
].filter(Boolean);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
}));
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to octofit_db'))
    .catch((err) => console.error('MongoDB connection error:', err));
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
const startServer = () => {
    app.listen(exports.PORT, '0.0.0.0', () => {
        console.log(`Server is running on ${exports.API_BASE_URL}`);
        console.log(`Local development URL: http://localhost:${exports.PORT}`);
    });
};
exports.startServer = startServer;
exports.default = app;
