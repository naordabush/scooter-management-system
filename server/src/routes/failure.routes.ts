import { Router } from "express";
import { getAllFailures, createFailure, getFailureById, updateFailure, deleteFailure, getOpenFailuresForScooter, getAllFailuresForScooter } from "../controllers/failure.controller";

const router = Router();

router.get("/", getAllFailures);
router.post("/", createFailure);
router.get("/scooter/:scooterId/open", getOpenFailuresForScooter);
router.get("/scooter/:scooterId", getAllFailuresForScooter);
router.get("/:id", getFailureById);
router.put("/:id", updateFailure);
router.delete("/:id", deleteFailure);

export default router;
