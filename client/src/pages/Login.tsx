import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Alert, Paper } from "@mui/material";
import api from "../services/api";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await api.post("/users/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/parking");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Scooter Admin
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus required />

          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <Button type="submit" variant="contained" size="large">
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
