import { Schema, model as mongooseModel, Document } from "mongoose";

export interface IScooter extends Document {
  uniqueId: string;
  location: { type: "Point"; coordinates: [number, number] };
  scooterModel: string;
  year: number;
  status: "active" | "broken" | "handled" | "charged";
}

const ScooterSchema = new Schema<IScooter>({
  uniqueId: { type: String, required: true, unique: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  scooterModel: { type: String, required: true },
  year: { type: Number, required: true },
  status: { type: String, enum: ["active", "broken", "handled", "charged"], default: "active" },
});

ScooterSchema.index({ location: "2dsphere" });

export const Scooter = mongooseModel<IScooter>("Scooter", ScooterSchema);
