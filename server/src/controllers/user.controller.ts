import { RequestHandler } from "express";
import { findAllUsers, createUserService, findUserById, updateUserService, deleteUserService, loginService } from "../services/user.service";

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const createUser: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;
    const user = await createUserService(payload);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const updated = await updateUserService(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const ok = await deleteUserService(req.params.id);
    if (!ok) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User deleted" });
    return;
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
    return;
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await loginService(username, password);
    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
