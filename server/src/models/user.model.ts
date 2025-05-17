import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const User = model<IUser>("User", UserSchema);
