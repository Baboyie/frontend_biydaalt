import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast, ToastContainer } from "react-toastify"; // Импорт хийж буй хэсэг
import "react-toastify/dist/ReactToastify.css"; // Стилүүдийг импортоор авах

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for login
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields!"); // Алдааны мэдэгдэл
      return;
    }

    setLoading(true); // Show loading spinner during login attempt

    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin123") {
        toast.success("Logged in as Admin!"); // Амжилттай мэдэгдэл
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else if (email === "user@gmail.com" && password === "user123") {
        toast.success("Logged in as User!"); // Амжилттай мэдэгдэл
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isAdmin", "false");
        navigate("/home");
      } else {
        toast.error("Wrong Username or Password!"); // Алдааны мэдэгдэл
      }
      setLoading(false); // Stop loading after the login attempt
    }, 1000); // Simulate delay for better UX
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={12}
        sx={{
          p: 4,
          mt: 8,
          textAlign: "center",
          borderRadius: "16px", // Rounded corners for the form
          backgroundColor: "#f5f5f5", // Light background color
          boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#333", fontWeight: "600" }}
        >
          Welcome Back
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>
          Please sign in to continue
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& .MuiTextField-root": { marginBottom: "16px" },
          }}
        >
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
            type={showPassword ? "text" : "password"} // Toggle the password visibility
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
              background: "#5533ff", // Your preferred button color
              "&:hover": {
                background: "#4c2bbf", // Darker shade for hover
              },
              padding: "12px",
            }}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Login"
            )}
          </Button>
        </Box>
      </Paper>

      {/* ToastContainer to display the toast notifications */}
      <ToastContainer
        position="top-center" // Notification in the center top of the screen
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
