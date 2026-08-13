import mongoose, { Schema, model, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  username: string;
  age: number;
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  teamId?: mongoose.Types.ObjectId;
  goals: string[];
  createdAt: Date;
}

export interface ITeam {
  name: string;
  sport: string;
  coach: string;
  points: number;
  memberIds: mongoose.Types.ObjectId[];
  createdAt: Date;
}

export interface IActivity {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  type: 'Running' | 'Walking' | 'Strength' | 'Cycling' | 'Yoga';
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}

export interface ILeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  activityType: string;
  updatedAt: Date;
}

export interface IWorkout {
  userId: mongoose.Types.ObjectId;
  name: string;
  focus: string;
  durationMinutes: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  exercises: string[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  fitnessLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  goals: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  coach: { type: String, required: true },
  points: { type: Number, default: 0 },
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  type: { type: String, enum: ['Running', 'Walking', 'Strength', 'Cycling', 'Yoga'], required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: Number,
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: String
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  activityType: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const workoutSchema = new Schema<IWorkout>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'], required: true },
  exercises: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

export const User: Model<IUser> = model<IUser>('User', userSchema);
export const Team: Model<ITeam> = model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = model<IActivity>('Activity', activitySchema);
export const Leaderboard: Model<ILeaderboardEntry> = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
export const Workout: Model<IWorkout> = model<IWorkout>('Workout', workoutSchema);

export default { User, Team, Activity, Leaderboard, Workout };
