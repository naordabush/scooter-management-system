import api from "./api";

export interface ParkingPayload {
  address: string;
  capacity: number;
  location: { type: "Point"; coordinates: [number, number] };
}

export const getParkings = () => api.get("/parkings");
export const createParking = (payload: ParkingPayload) =>
  api.post("/parkings", payload);
