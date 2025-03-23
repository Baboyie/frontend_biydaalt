import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Container, Typography, Paper } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    } else if (email === "test.user@gmail.com" && password === "12345") {
      alert(`Logged in as: ${email}`);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/home");
    } else {
      alert("Wrong Username or Password!!");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
