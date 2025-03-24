
import { Card, CardContent, Typography, Button, Box, Grid } from "@mui/material";

function CartPage({ cart, removeFromCart }) {
  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item key={`${item.id}-${item.selectedColor}`} xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <Box
                    component="img"
                    src={item.picture}
                    alt={item.name}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${Number(item.price).toFixed(2)} x {item.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Color: {item.selectedColor}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeFromCart(item)} // Use removeFromCart function
                    >
                      Remove
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Total Price Section */}
          <Box sx={{ marginTop: 3, textAlign: "right" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Total: ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default CartPage;