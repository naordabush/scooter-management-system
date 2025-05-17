import { Schema, model, Document } from "mongoose";

export interface IParking extends Document {
  address: string;
  capacity: number;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

const ParkingSchema = new Schema<IParking>({
  address: { type: String, required: true },
  capacity: { type: Number, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
});

ParkingSchema.index({ location: "2dsphere" });

export const Parking = model<IParking>("Parking", ParkingSchema);
