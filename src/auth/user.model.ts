import * as mongoose from 'mongoose';

export enum Role {
  Manager = 'Manager',
  Customer = 'Customer',
}

export const USER_MODEL_NAME = 'User';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  role: {
    type: Object.values(Role),
    required: true,
    default: Role.Customer,
  },
});

export interface User extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  age: number;
  role: Role;
}
