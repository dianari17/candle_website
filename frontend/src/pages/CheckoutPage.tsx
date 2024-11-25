import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Function to navigate back to the products page
  const moveProducts = () => {
    navigate("/products"); };

  return (
    <Box
      sx={{
        backgroundColor: "#4B4B3B", // Match the background
        width: "100vw",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Button onClick={moveProducts} sx={{ display: "flex", alignItems: "center", color: "#FFFFFF" }}>
        <ArrowBackIcon sx={{ height: "4rem", width: "3rem" }} />
        <Typography sx={{ padding: "1rem" }}>Back to Shopping</Typography>
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            ACCOUNT
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography>Email@gmail.com</Typography>
            <Button sx={{ color: "#FFFFFF" }}>Change</Button>
          </Box>

          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Ship to
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography>
              Name, Street Name <br />
              City, State, Zipcode, Country
            </Typography>
            <Button sx={{ color: "#FFFFFF" }}>Change</Button>
          </Box>

          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Delivery Method
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <Select
              value="3-7 Business Days"
              displayEmpty
              sx={{
                backgroundColor: "#61614B",
                color: "#FFFFFF",
                borderRadius: "5px",
              }}
            >
              <MenuItem value="3-7 Business Days">3-7 Business Days</MenuItem>
              <MenuItem value="Next Day">Next Day</MenuItem>
            </Select>
          </FormControl>

          {/* Terms & PayPal Button ????*/}
          <Typography
            sx={{ fontSize: "0.9rem", color: "#CCC", marginTop: "20px" }}
          >
            By submitting your order, you agree to our Terms of Service & Privacy
            Policy.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0070BA",
              color: "#FFFFFF",
              width: "100%",
              padding: "15px",
              marginTop: "20px",
            }}
          >
            Pay with PayPal
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              padding: "20px",
              backgroundColor: "#61614B",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ display: "flex", marginBottom: "20px" }}>
              <img
                src="https://via.placeholder.com/80"
                alt="Product"
                style={{ width: "80px", height: "80px", marginRight: "10px" }}
              />
              <Box>
                <Typography>Product Name</Typography>
                <Typography>$12.00</Typography>
              </Box>
            </Box>

            {/* Discount Code was on the figma dont know if were implementing*/}
            <Box sx={{ display: "flex", marginBottom: "20px" }}>
              <TextField
                fullWidth
                placeholder="Discount code"
                sx={{
                  marginRight: "10px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "5px",
                }}
              />
              <Button
                variant="outlined"
                sx={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
              >
                Apply
              </Button>
            </Box>

            <Box sx={{ borderTop: "1px solid #FFFFFF", paddingTop: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography>Subtotal:</Typography>
                <Typography>$12.00</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography>Shipping:</Typography>
                <Typography>$6.99</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography>Estimated Taxes:</Typography>
                <Typography>$0.98</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                <Typography>Total:</Typography>
                <Typography>$19.97</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: "20px", textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "#CCC", marginBottom: "5px" }}>
          <a
            href="#"
            style={{
              color: "#FFFFFF",
              textDecoration: "none",
              marginRight: "10px",
            }}
          >
            Refund Policy
          </a>
          <a
            href="#"
            style={{
              color: "#FFFFFF",
              textDecoration: "none",
              marginRight: "10px",
            }}
          >
            Shipping Policy
          </a>
          <a
            href="#"
            style={{
              color: "#FFFFFF",
              textDecoration: "none",
              marginRight: "10px",
            }}
          >
            Privacy Policy
          </a>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none" }}>
            Terms of Service
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
