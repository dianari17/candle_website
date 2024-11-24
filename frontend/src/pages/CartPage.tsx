import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../assets/Custom-Assets/brandLogo";
import Typography from "@mui/material/Typography";
import "../assets/Custom-Style-Sheets/Login.css";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import TestUI from "../components/TestUI";

const CartPage = () => {
  const navigate = useNavigate();

  function moveProducts() {
    navigate("/products");
  }

  return (
    <Box className="Cart-page">
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          lg={3}
          sx={{ display: "flex", justifyContent: "center" }}
          className="BackButton"
        >
          <Button onClick={moveProducts}>
            <ArrowBackIcon sx={{ height: "4rem", width: "3rem" }} />
            <Typography sx={{ padding: "1rem" }}>Back to Shopping</Typography>
          </Button>
        </Grid>
        <Grid
          item
          xs={1}
          md={12}
          lg={6}
          sx={{ display: "flex", justifyContent: "center", marginLeft: "auto" }}
        >
          <Typography
            level="h1"
            component="ellipse"
            sx={{
              fontSize: "2.5rem", // Increase the font size
              fontWeight: "bold", // Make the text bold
              textAlign: "center", // Center the text
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow for depth
            }}
          >
            Your Shopping Cart
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          md={9}
          lg={3}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          {" "}
          <BrandLogo
            className="Logo"
            style={{
              height: "172px",
              width: "470px",
              marginLeft: "1rem",
              marginTop: "0rem",
            }}
          />
        </Grid>
      </Grid>
      <TestUI />
    </Box>
  );
};

export default CartPage;
<div >
  <div>
    
  </div>
  <div>
   
  </div>
  <div ></div>
</div>;
