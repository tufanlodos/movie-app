import * as mongoose from 'mongoose';
import { Session, SessionSchema } from './session.model';

export const MOVIE_MODEL_NAME = 'Movie';

export const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    minAge: { type: Number, required: true },
    sessions: { type: [SessionSchema], required: true },
  },
  { timestamps: true },
);

export interface Movie extends mongoose.Document {
  id: string;
  name: string;
  minAge: number;
  sessions: Session[];
  createdAt: Date;
  updatedAt: Date;
}
