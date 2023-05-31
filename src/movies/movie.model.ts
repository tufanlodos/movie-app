import * as mongoose from 'mongoose';
import { Session, SessionSchema } from './session.model';

export const MOVIE_MODEL_NAME = 'Movie';

export const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sessions: { type: [SessionSchema], required: true },
  minAge: { type: Number, required: true },
});

export interface Movie extends mongoose.Document {
  id: string;
  name: string;
  sessions: Session[];
  minAge: number;
}
