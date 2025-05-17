import { Schema, model, Document, Types } from "mongoose";

export interface IFailure extends Document {
  type: "routine care" | "brake replacement" | "wheel replacement";
  status: "open" | "care" | "closed";
  openedAt: Date;
  closedAt?: Date;
  scooter: Types.ObjectId;
}

const FailureSchema = new Schema<IFailure>({
  type: {
    type: String,
    enum: ["routine care", "brake replacement", "wheel replacement"],
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "care", "closed"],
    default: "open",
  },
  openedAt: { type: Date, required: true },
  closedAt: { type: Date },
  scooter: {
    type: Schema.Types.ObjectId,
    ref: "Scooter",
    required: true,
  },
});

export const Failure = model<IFailure>("Failure", FailureSchema);
