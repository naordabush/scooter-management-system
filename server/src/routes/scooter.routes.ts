import { Router } from "express";
import { getAllScooters, filterScootersByPolygon, createScooter, getScooterById, getActiveScooters, updateScooter, deleteScooter } from "../controllers/scooter.controller";

const router = Router();

router.post("/", createScooter);
router.get("/", getAllScooters);
router.get("/active", getActiveScooters);
router.get("/:id", getScooterById);
router.put("/:id", updateScooter);
router.delete("/:id", deleteScooter);

router.post("/filter-by-polygon", filterScootersByPolygon);

export default router;
