import { RequestHandler } from "express";
import * as parkingService from "../services/parking.service";

export const getAllParkings: RequestHandler = async (req, res) => {
  try {
    const parkings = await parkingService.findAllParkings();
    res.json(parkings);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createParking: RequestHandler = async (req, res) => {
  try {
    const parking = await parkingService.createParkingService(req.body);
    res.status(201).json(parking);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getParkingById: RequestHandler = async (req, res) => {
  try {
    const parking = await parkingService.findParkingById(req.params.id);
    if (!parking) {
      res.status(404).json({ message: "Parking not found" });
      return;
    }
    res.json(parking);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateParking: RequestHandler = async (req, res) => {
  try {
    const updated = await parkingService.updateParkingService(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Parking not found" });
      return;
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteParking: RequestHandler = async (req, res) => {
  try {
    const deleted = await parkingService.deleteParkingService(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Parking not found" });
      return;
    }
    res.json({ message: "Parking deleted" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
