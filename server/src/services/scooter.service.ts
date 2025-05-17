import { Scooter } from "../models/scooter.model";

export const getAllScootersService = async () => {
  return await Scooter.find();
};

export const filterScootersByPolygonService = async (polygon: any) => {
  return await Scooter.find({
    location: { $geoWithin: { $geometry: polygon } },
  });
};

export const createScooterService = async (data: {
  uniqueId: string;
  location: any;
  scooterModel: string;
  year: number;
  status: string;
}) => {
  const scooter = new Scooter(data);
  await scooter.save();
  return scooter;
};

export const getScooterByIdService = async (id: string) => {
  return await Scooter.findById(id);
};

export const getActiveScootersService = async () => {
  return await Scooter.find({ status: "active" });
};

export const updateScooterService = async (id: string, data: any) => {
  return await Scooter.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteScooterService = async (id: string) => {
  return await Scooter.findByIdAndDelete(id);
};
