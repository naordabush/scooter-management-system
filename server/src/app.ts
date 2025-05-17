import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import scooterRoutes from "./routes/scooter.routes";
import userRoutes from "./routes/user.routes";
import parkingRoutes from "./routes/parking.routes";
import failureRoutes from "./routes/failure.routes";

const app = express();

// Allow requests from your frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cors());
app.use(express.json());

app.use("/api/scooters", scooterRoutes);
app.use("/api/users", userRoutes);
app.use("/api/parkings", parkingRoutes);
app.use("/api/failures", failureRoutes);

const port = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => console.error("DB connection error:", err));
