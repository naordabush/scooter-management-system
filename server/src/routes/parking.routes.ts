import { Router } from "express";
import {
  getAllParkings,
  createParking,
  getParkingById,
  updateParking,
  deleteParking,
} from "../controllers/parking.controller";

const router = Router();

router.get("/", getAllParkings);
router.post("/", createParking);
router.get("/:id", getParkingById);
router.put("/:id", updateParking);
router.delete("/:id", deleteParking);

export default router;
