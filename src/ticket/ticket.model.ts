import * as mongoose from 'mongoose';

export const TICKET_MODEL_NAME = 'Ticket';

export const TicketSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    sessionId: { type: String, required: true },
  },
  { timestamps: true },
);

export interface Ticket extends mongoose.Document {
  id: string;
  userId: string;
  movieId: string;
  sessionId: string;
  createdAt: Date;
  updatedAt: Date;
}
