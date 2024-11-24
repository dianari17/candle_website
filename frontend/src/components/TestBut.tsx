import React from 'react';
import "../assets/christinasStyleSheet.css"
import BrandLogo from '../assets/brandLogo';
import {useNavigate} from 'react-router-dom'
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid"; 
import AddToCart from '../assets/addToCartButton';

function TestBut(){

const navigate = useNavigate();
 function moveHome() {
   navigate("/");
 }

 function moveAbt(){
    navigate('/about')
}
function moveLog(){
    navigate('/login')
}
function moveSign(){
    navigate('/signup')
}
function moveCart(){
    navigate('/cart')
}
function moveProducts() {
  navigate('/products')
}

return (
  <Box
    sx={{
      backgroundColor: "#A48A79", // Light brown background
      width: "100%",
      padding: "15px 0 0 ",
      position: "fixed", // Fixed at the top
      top: "0",
      left: "0",
      zIndex: "1000", // Ensure it stays above other content
      textAlign: "center", // Center the text items
    }}
  >
    <Grid container spacing={12}>
      <Grid item lg={2}>
        <BrandLogo
          style={{
            height: "50px", // Adjust the height of the logo
            width: "auto", // Maintain aspect ratio
          }}
        />
      </Grid>
      <Grid item Lg={2}>
        <button
          style={{
            marginTop: "3rem",
            padding: "10px 20px",
            fontSize: "30px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#A48A79",
            color: "#FFF",
            cursor: "pointer",
          }}
          onClick={moveHome}
        >
          Home
        </button>
      </Grid>

      <Grid item Lg={2}>
        <button
          style={{
            marginTop: "3rem",
            padding: "10px 20px",
            fontSize: "30px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#A48A79",
            color: "#FFF",
            cursor: "pointer",
          }}
          onClick={moveProducts}
        >
          Products
        </button>
      </Grid>
      <Grid item Lg={2}>
        <button
          style={{
            marginTop: "3rem",
            padding: "10px 20px",
            fontSize: "30px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#A48A79",
            color: "#FFF",
            cursor: "pointer",
          }}
          onClick={moveAbt}
        >
          About Us
        </button>
      </Grid>
      <Grid item Lg={2}>
        <button
          style={{
            marginTop: "3rem",
            padding: "10px 20px",
            fontSize: "30px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#A48A79",
            color: "#FFF",
            cursor: "pointer",
          }}
          onClick={moveLog}
        >
          Log In
        </button>
      </Grid>
      <Grid item Lg={2}>
        <button
          style={{
            marginTop: "3rem",
            padding: "10px 20px",
            fontSize: "30px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#A48A79",
            color: "#FFF",
            cursor: "pointer",
          }}
          onClick={moveSign}
        >
          Sign Up
        </button>
      </Grid>
      <Grid item Lg={2} sx={{ ml: "auto" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "30px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#A48A79",
            color: "#FFF",
            cursor: "pointer",
          }}
          onClick={moveCart}
        >
          <AddToCart />
        </button>
      </Grid>
    </Grid>
  </Box>
);

}

export default TestBut;