import { Router } from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser } from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

export default router;
