import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Import routes
import scooterRoutes from "./routes/scooter.routes";
import userRoutes from "./routes/user.routes";
import parkingRoutes from "./routes/parking.routes";
import failureRoutes from "./routes/failure.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/scooters", scooterRoutes);
app.use("/api/users", userRoutes);
app.use("/api/parkings", parkingRoutes);
app.use("/api/failures", failureRoutes);

// Start server after DB connection
const port = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => console.error("DB connection error:", err));
