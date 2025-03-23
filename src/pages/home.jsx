import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Box sx={{ bgcolor: "primary.main", color: "white", p: 5, borderRadius: 2 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Our Store
        </Typography>
        <Typography variant="h5" paragraph>
          Find the best products at unbeatable prices!
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          component={Link} 
          to="/menu" 
          sx={{ mt: 2 }}
        >
          Shop Now
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
