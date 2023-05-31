import * as mongoose from 'mongoose';

export const SESSION_MODEL_NAME = 'Session';

export const SessionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  room: { type: String, required: true },
});

export interface Session extends mongoose.Document {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  room: string;
}
