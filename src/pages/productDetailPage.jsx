import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Container,
  CircularProgress,
  Alert,
  Tooltip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found.");
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Ensure colors is an array (in case of JSON parsing issues)
        const colorsArray = Array.isArray(data.colors) ? data.colors : JSON.parse(data.colors || "[]");

        setProduct({ ...data, colors: colorsArray });
        setSelectedColor(colorsArray?.[0] || null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      ...product,
      selectedColor,
      quantity
    });
    
    // Navigate back safely
    navigate(-1);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate("/menu")}>
          Go Back to Products
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <CloseIcon />
      </IconButton>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 4,
        alignItems: 'flex-start'
      }}>
        {/* Product Image */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center',
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 1
        }}>
          <Box
            component="img"
            src={product.picture || "/placeholder.png"}
            alt={product.name}
            sx={{
              maxWidth: '100%',
              maxHeight: 400,
              objectFit: 'contain'
            }}
          />
        </Box>

        {/* Product Info */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>

          <Typography variant="body1" paragraph sx={{ mt: 3 }}>
            {product.description}
          </Typography>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Available Colors:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: 'wrap' }}>
                {product.colors.map((color, index) => (
                  <Tooltip key={index} title={color} arrow>
                    <Box
                      onClick={() => setSelectedColor(color)}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: color,
                        border: selectedColor === color 
                          ? "2px solid #000" 
                          : "2px solid #eee",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
            </Box>
          )}

          {/* Quantity Selector */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Quantity:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button 
                variant="outlined" 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                sx={{ minWidth: 40 }}
              >
                -
              </Button>
              <Typography>{quantity}</Typography>
              <Button 
                variant="outlined" 
                onClick={() => setQuantity(q => q + 1)}
                sx={{ minWidth: 40 }}
              >
                +
              </Button>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{ mt: 4, px: 4, py: 1.5 }}
            onClick={handleAddToCart}
            disabled={!selectedColor}
          >
            {selectedColor ? "Add to Cart" : "Select a Color First"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
