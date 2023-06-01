import * as mongoose from 'mongoose';
import { User } from 'src/auth';
import { Movie } from 'src/movie';

export const WATCH_MODEL_NAME = 'Watch';

export const WatchSchema = new mongoose.Schema(
  {
    user: { type: Object, required: true },
    movie: { type: Object, required: true },
    ticketId: { type: String, required: true },
  },
  { timestamps: true },
);

export interface Watch extends mongoose.Document {
  id: string;
  user: User;
  movie: Movie;
  ticketId: string;
  createdAt: Date;
  updatedAt: Date;
}
