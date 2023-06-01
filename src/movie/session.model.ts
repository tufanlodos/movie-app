import * as mongoose from 'mongoose';

export const SESSION_MODEL_NAME = 'Session';

export const TIME_SLOTS = [
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00',
  '16:00-18:00',
  '18:00-20:00',
  '20:00-22:00',
  '22:00-00:00',
] as const;

export const ROOMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const SessionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  timeSlot: {
    type: String,
    required: true,
    enum: {
      values: TIME_SLOTS,
      message: '{VALUE} is not supported for the time slot',
    },
  },
  room: {
    type: Number,
    required: true,
    enum: { values: ROOMS, message: '{VALUE} is not supported for the room' },
  },
});

export interface Session extends mongoose.Document {
  id: string;
  date: Date;
  timeSlot: string;
  room: number;
}
