import React from "react";
import "../assets/Custom-Style-Sheets/christinasStyleSheet.css";
import BrandLogo from "../assets/Custom-Assets/brandLogo";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import AddToCart from "../assets/Custom-Assets/addToCartButton";

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const buttonStyle = (path: string) => ({
    padding: "5px 10px",
    fontSize: "2rem",
    border: "none",
    backgroundColor: "transparent",
      color: path === "/" 
    ? (location.pathname === path ? "#644934" : "#FFF") // Match exactly for "/"
    : location.pathname.startsWith(path) ? "#644934" : "#FFF", // Match for other paths
    // Changes color if on the page
    cursor: "pointer",
    textDecoration: location.pathname === path ? "underline" : "none", // Underline if active
    transition: "color 0.3s ease", // Smooth hover and color transition
  });

  return (
    <Box
      sx={{
        backgroundColor: "#A48A79",
        width: "100%",
        padding: { xs: "10px 0", md: "15px 0" },
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
        textAlign: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
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
          md={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <BrandLogo
            style={{
              height: "110px",
              width: "auto",
            }}
          />
        </Grid>
        <Grid item xs={4} md={1}>
          <button
            style={buttonStyle("/")}
            onClick={() => navigate("/")}
            onMouseOver={(e) => (e.currentTarget.style.color = "#644934")}
            onMouseOut={(e) => {
              e.currentTarget.style.color =
                location.pathname === "/" ? "#644934" : "#FFF";
            }}
          >
            Home
          </button>
        </Grid>
        <Grid item xs={4} md={1}>
          <button
            style={buttonStyle("/products")}
            onClick={() => navigate("/products")}
            onMouseOver={(e) => (e.currentTarget.style.color = "#644934")}
            onMouseOut={(e) => {
              e.currentTarget.style.color =
                location.pathname === "/products" ? "#644934" : "#FFF";
            }}
          >
            Products
          </button>
        </Grid>
        <Grid item xs={4} md={1}>
          <button
            style={buttonStyle("/about")}
            onClick={() => navigate("/about")}
            onMouseOver={(e) => (e.currentTarget.style.color = "#644934")}
            onMouseOut={(e) => {
              e.currentTarget.style.color =
                location.pathname === "/about" ? "#644934" : "#FFF";
            }}
          >
            About Us
          </button>
        </Grid>
        <Grid item xs={4} md={1}>
          <button
            style={buttonStyle("/login")}
            onClick={() => navigate("/login")}
            onMouseOver={(e) => (e.currentTarget.style.color = "#644934")}
            onMouseOut={(e) => {
              e.currentTarget.style.color =
                location.pathname === "/login" ? "#644934" : "#FFF";
            }}
          >
            Account
          </button>
        </Grid>
        <Grid
          item
          xs={4}
          md={1}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            ml: "auto",
            mr:"2rem"
          }}
        >
          <button
            style={buttonStyle("/cart")}
            onClick={() => navigate("/cart")}
            onMouseOver={(e) => (e.currentTarget.style.color = "#644934")}
            onMouseOut={(e) => {
              e.currentTarget.style.color =
                location.pathname === "/cart" ? "#644934" : "#FFF";
            }}
          >
            <AddToCart />
          </button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NavigationBar;
