import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Avatar, 
  TextField, 
  Button, 
  CircularProgress,
  Alert
} from "@mui/material";
import axios from "axios";

export default function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar_url: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = userId 
          ? `/api/profile/${userId}`
          : '/api/profile/me';
        
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        setProfile(response.data);
        setFormData({
          name: response.data.name,
          bio: response.data.bio || "",
          avatar_url: response.data.avatar_url || ""
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        "/api/profile/me",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setProfile(response.data);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!profile) return <Typography>Profile not found</Typography>;

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: "0 auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
        <Avatar 
          src={profile.avatar_url} 
          sx={{ width: 100, height: 100 }}
        />
        {isEditing ? (
          <TextField
            label="Avatar URL"
            value={formData.avatar_url}
            onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
            fullWidth
          />
        ) : (
          <Box>
            <Typography variant="h4">{profile.name}</Typography>
            {profile.is_admin && (
              <Typography color="primary">Admin</Typography>
            )}
          </Box>
        )}
      </Box>

      {isEditing ? (
        <>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Bio"
            multiline
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={handleUpdate}
            > 
              Save
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: 2, whiteSpace: "pre-line" }}>
            {profile.bio || "No bio yet"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Member since: {new Date(profile.created_at).toLocaleDateString()}
          </Typography>
          
          {!userId && (
            <Button 
              variant="contained" 
              onClick={() => setIsEditing(true)}
              sx={{ mt: 3 }}
            >
              Edit Profile
            </Button>
          )}
        </>
      )}
    </Box>
  );
}