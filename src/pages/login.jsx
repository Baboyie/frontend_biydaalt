import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios for API calls

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login/register
  const [name, setName] = useState(""); // Additional field for registration
  const navigate = useNavigate();

  // API base URL - adjust according to your backend
  const API_URL = "http://localhost:5000/api"; // Change this to your backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (isRegistering && !name) {
      toast.error("Please enter your name");
      return;
    }

    setLoading(true);

    try {
      if (isRegistering) {
        // Handle registration
        const response = await axios.post(`${API_URL}/auth/register`, {
          name,
          email,
          password
        });
        toast.success("Registration successful! Please login.");
        setIsRegistering(false); // Switch back to login form
      } else {
        // Handle login
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password
        });
        
        const { token, user } = response.data;
        
        // Store user data and token
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isAdmin", user.isAdmin ? "true" : "false");
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(`Welcome back, ${user.name}!`);
        
        // Redirect based on user role
        navigate(user.isAdmin ? "/admin" : "/home");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={12}
        sx={{
          p: 4,
          mt: 8,
          textAlign: "center",
          borderRadius: "16px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#333", fontWeight: "600" }}
        >
          {isRegistering ? "Create Account" : "Welcome Back"}
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>
          {isRegistering ? "Register to get started" : "Please sign in to continue"}
        </Typography>
        
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& .MuiTextField-root": { marginBottom: "16px" },
          }}
        >
          {isRegistering && (
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                input: { padding: "12px" },
              }}
            />
          )}
          
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            variant="outlined"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              input: { padding: "12px" },
            }}
          />
          
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            variant="outlined"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              input: { padding: "12px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: "8px",
              background: "#5533ff",
              "&:hover": { background: "#4c2bbf" },
              padding: "12px",
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              isRegistering ? "Register" : "Login"
            )}
          </Button>
          
          <Typography variant="body2" sx={{ mt: 2 }}>
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setIsRegistering(!isRegistering);
                setEmail("");
                setPassword("");
                setName("");
              }}
              style={{ color: "#5533ff", fontWeight: "bold" }}
            >
              {isRegistering ? "Login" : "Register"}
            </Link>
          </Typography>
        </Box>
      </Paper>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeButton
        rtl={false}
        draggable
        pauseOnHover
      />
    </Container>
  );
}