import { Parking, IParking } from "../models/parking.model";

export const findAllParkings = async (): Promise<IParking[]> => {
  return Parking.find().lean();
};

export const createParkingService = async (data: {
  address: string;
  capacity: number;
  location: string;
}): Promise<IParking> => {
  const parking = new Parking(data);
  await parking.save();
  return parking;
};

export const findParkingById = async (id: string): Promise<IParking | null> => {
  return Parking.findById(id).lean();
};

export const updateParkingService = async (
  id: string,
  updates: Partial<IParking>
): Promise<IParking | null> => {
  return Parking.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
};

export const deleteParkingService = async (id: string): Promise<boolean> => {
  const result = await Parking.findByIdAndDelete(id);
  return !!result;
};
