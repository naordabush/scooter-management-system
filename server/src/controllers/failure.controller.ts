import { RequestHandler } from "express";
import * as failureService from "../services/failure.service";

export const getAllFailures: RequestHandler = async (req, res) => {
  try {
    const failures = await failureService.findAllFailures();
    res.json(failures);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createFailure: RequestHandler = async (req, res) => {
  try {
    const failure = await failureService.createFailureService(req.body);
    res.status(201).json(failure);
  } catch (err: any) {
    const status = err.message === "Scooter not found" ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const getFailureById: RequestHandler = async (req, res) => {
  try {
    const failure = await failureService.findFailureById(req.params.id);
    if (!failure) {
      res.status(404).json({ message: "Failure not found" });
      return;
    }
    res.json(failure);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFailure: RequestHandler = async (req, res) => {
  try {
    const failure = await failureService.updateFailureService(req.params.id, req.body);
    res.json(failure);
  } catch (err: any) {
    const status = err.message === "Failure not found" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const deleteFailure: RequestHandler = async (req, res) => {
  try {
    await failureService.deleteFailureService(req.params.id);
    res.json({ message: "Failure deleted" });
  } catch (err: any) {
    const status = err.message === "Failure not found" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const getOpenFailuresForScooter: RequestHandler = async (req, res) => {
  try {
    const failures = await failureService.findOpenFailuresForScooter(req.params.scooterId);
    res.json(failures);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllFailuresForScooter: RequestHandler = async (req, res) => {
  try {
    const failures = await failureService.findAllFailuresForScooter(req.params.scooterId);
    res.json(failures);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
