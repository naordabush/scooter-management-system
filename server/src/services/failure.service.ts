import { Failure, IFailure } from "../models/failure.model";
import { Scooter } from "../models/scooter.model";

export const findAllFailures = async (): Promise<IFailure[]> => {
  return Failure.find().lean();
};

export const createFailureService = async (data: {
  type: IFailure["type"];
  status: IFailure["status"];
  openedAt: Date;
  closedAt?: Date;
  scooter: string;
}): Promise<IFailure> => {
  const scooter = await Scooter.findById(data.scooter);
  if (!scooter) throw new Error("Scooter not found");

  scooter.status = "broken";
  await scooter.save();

  const failure = new Failure(data);
  await failure.save();
  return failure;
};

export const findFailureById = async (id: string): Promise<IFailure | null> => {
  return Failure.findById(id).lean();
};

export const updateFailureService = async (
  id: string,
  updates: Partial<IFailure>
): Promise<IFailure> => {
  const failure = await Failure.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!failure) throw new Error("Failure not found");

  const openFailures = await Failure.find({
    scooter: failure.scooter,
    status: { $ne: "closed" },
  });
  if (openFailures.length === 0) {
    await Scooter.findByIdAndUpdate(failure.scooter, { status: "active" });
  }

  return failure;
};

export const deleteFailureService = async (id: string): Promise<void> => {
  const res = await Failure.findByIdAndDelete(id);
  if (!res) throw new Error("Failure not found");
};

export const findOpenFailuresForScooter = async (
  scooterId: string
): Promise<IFailure[]> => {
  return Failure.find({ scooter: scooterId, status: { $ne: "closed" } }).lean();
};

export const findAllFailuresForScooter = async (
  scooterId: string
): Promise<IFailure[]> => {
  return Failure.find({ scooter: scooterId }).lean();
};
