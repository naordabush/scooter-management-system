import { RequestHandler } from "express";
import { getAllScootersService, filterScootersByPolygonService, createScooterService, getScooterByIdService, getActiveScootersService, updateScooterService, deleteScooterService } from "../services/scooter.service";

export const getAllScooters: RequestHandler = async (req, res) => {
  try {
    const scooters = await getAllScootersService();
    res.json(scooters);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const filterScootersByPolygon: RequestHandler = async (req, res) => {
  try {
    const { polygon } = req.body;
    if (!polygon) {
      res.status(400).json({ message: "Missing polygon payload" });
      return;
    }
    const scooters = await filterScootersByPolygonService(polygon);
    res.json(scooters);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createScooter: RequestHandler = async (req, res) => {
  try {
    const scooter = await createScooterService(req.body);
    res.status(201).json(scooter);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getScooterById: RequestHandler = async (req, res) => {
  try {
    const scooter = await getScooterByIdService(req.params.id);
    if (!scooter) {
      res.status(404).json({ message: "Scooter not found" });
      return;
    }
    res.json(scooter);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getActiveScooters: RequestHandler = async (req, res) => {
  try {
    const scooters = await getActiveScootersService();
    res.json(scooters);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateScooter: RequestHandler = async (req, res) => {
  try {
    const updated = await updateScooterService(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Scooter not found" });
      return;
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteScooter: RequestHandler = async (req, res) => {
  try {
    const deleted = await deleteScooterService(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Scooter not found" });
      return;
    }
    res.json({ message: "Scooter deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
