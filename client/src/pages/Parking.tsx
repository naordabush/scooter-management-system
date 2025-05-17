import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent, TextField, Alert, Stack, Box, Button } from "@mui/material";
import { getParkings, createParking, ParkingPayload } from "../services/parkingService";

interface Parking {
  _id: string;
  address: string;
  capacity: number;
  location: { type: string; coordinates: [number, number] };
}

const Parking: React.FC = () => {
  const [parkings, setParkings] = useState<Parking[]>([]);
  const [formData, setFormData] = useState<ParkingPayload>({
    address: "",
    capacity: 0,
    location: { type: "Point", coordinates: [0, 0] },
  });
  const [error, setError] = useState("");

  useEffect(() => {
    loadParkings();
  }, []);

  const loadParkings = async () => {
    try {
      const resp = await getParkings();
      setParkings(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createParking(formData);
      setFormData({ address: "", capacity: 0, location: { type: "Point", coordinates: [0, 0] } });
      loadParkings();
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create");
    }
  };

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Parking Management
        </Typography>

        <Box display="flex" gap={2}>
          <Box flex={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>Capacity</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Latitude</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parkings.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>{p.address}</TableCell>
                    <TableCell>{p.capacity}</TableCell>
                    <TableCell>{p.location.coordinates[0]}</TableCell>
                    <TableCell>{p.location.coordinates[1]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          <Box flex={2}>
            <Card>
              <CardContent component="form" onSubmit={handleFormSubmit}>
                <Typography variant="h6" gutterBottom>
                  Add New Parking
                </Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
                  <TextField fullWidth type="number" label="Capacity" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })} required />
                  <TextField
                    fullWidth
                    type="number"
                    label="Longitude"
                    value={formData.location.coordinates[0]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: [Number(e.target.value), formData.location.coordinates[1]],
                        },
                      })
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    type="number"
                    label="Latitude"
                    value={formData.location.coordinates[1]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          type: "Point",
                          coordinates: [formData.location.coordinates[0], Number(e.target.value)],
                        },
                      })
                    }
                    required
                  />
                  {error && <Alert severity="error">{error}</Alert>}
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Parking;
