import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St, City, Country",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic to save user data (e.g., API call)
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box sx={{ maxWidth: 400, margin: "auto" }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          disabled={!isEditing}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={user.address}
          onChange={handleInputChange}
          disabled={!isEditing}
          sx={{ marginBottom: 2 }}
        />
        {isEditing ? (
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ProfilePage;