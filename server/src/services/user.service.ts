import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET!;

export const findAllUsers = async (): Promise<Partial<IUser>[]> => {
  return User.find().select("-password").lean();
};

export const createUserService = async (
  data: Pick<IUser, "username" | "password" | "firstName" | "lastName" | "email">
): Promise<Partial<IUser>> => {
  const hashed = await bcrypt.hash(data.password, 10);
  const user = new User({ ...data, password: hashed });
  await user.save();
  return {
    id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};


export const findUserById = async (id: string): Promise<Partial<IUser> | null> => {
  return User.findById(id).select("-password").lean();
};

export const updateUserService = async (
  id: string,
  updates: Partial<IUser>
): Promise<Partial<IUser> | null> => {
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");
  return user;
};


export const deleteUserService = async (id: string): Promise<boolean> => {
  const res = await User.findByIdAndDelete(id);
  return res != null;
};

export const loginService = async (
  username: string,
  plainPassword: string
): Promise<string> => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(plainPassword, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
