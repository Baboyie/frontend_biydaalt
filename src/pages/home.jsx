import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          color: "white",
          p: 5,
          borderRadius: 3,
          backgroundImage:
            "url('https://source.unsplash.com/featured/?business,technology')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" gutterBottom>
              Welcome to Our Business
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h5" paragraph>
              We provide high-quality products and services that fit your needs.
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/menu"
              sx={{ mt: 2, mr: 2 }}
            >
              Explore Products
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/about"
              sx={{ mt: 2 }}
            >
              Learn More
            </Button>
          </motion.div>
        </Box>
      </Box>

      {/* About Section */}
      <Box sx={{ my: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Our mission is to provide the best products with the best service.
        </Typography>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ textAlign: "center" }}>
        {[
          {
            title: "High Quality",
            desc: "We ensure top-notch product quality.",
            icon: "🔧",
          },
          {
            title: "Affordable Prices",
            desc: "Great value for your money.",
            icon: "💰",
          },
          {
            title: "Fast Delivery",
            desc: "We deliver on time, every time.",
            icon: "🚚",
          },
        ].map((feature, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Card sx={{ p: 3, boxShadow: 3 }}>
                <Typography variant="h4">{feature.icon}</Typography>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.desc}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Testimonials Section */}
      <Box sx={{ my: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          What Our Customers Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              name: "John Doe",
              comment: "Amazing service! Highly recommend.",
              img: "https://i.pravatar.cc/100?img=1",
            },
            {
              name: "Jane Smith",
              comment: "Fantastic products at great prices!",
              img: "https://i.pravatar.cc/100?img=2",
            },
          ].map((review, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: 3,
                }}
              >
                <Avatar
                  src={review.img}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <CardContent>
                  <Typography variant="h6">{review.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    "{review.comment}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: "center",
          py: 5,
          bgcolor: "primary.light",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Join our community and start shopping today.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/contact"
          sx={{ mt: 2 }}
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
