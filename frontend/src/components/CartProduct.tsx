import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import BrandLogo from "../assets/Custom-Assets/brandLogo";
import Footer from "../components/Footer";
import { IProduct } from "../components/IProduct";
import { removeFromCart, updateCartAmount } from "./APICalls";

interface CartProductParams extends IProduct {
  deleteCallback: () => void;
  editAmountCallback: (quantity: number) => void;
}

export default function CartProduct({id, name, description, price, ingredients, weight, amount, deleteCallback, editAmountCallback }: CartProductParams) {

  const [quantity, setQuantity] = React.useState(amount);

  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  async function getImage() {
    try { 
        const response = await fetch('http://localhost:5000/api/productImage/' + id);
        if(!response.ok) {
            console.error("Failed to fetch image: " + response.statusText);
            return;
        }

        const image = await response.json();
        setImageSrc("data:" + image.contentType + ";base64, " + image.data);
    }
    catch(e: any) {
        console.error(e.toString());
    }
  }
  getImage();

  async function handleDecrement() {
    if(quantity == 1) {
      removeFromCart(id); deleteCallback();
    }
    else {
      updateCartAmount(id, quantity - 1);
      editAmountCallback(quantity - 1);
      setQuantity(quantity - 1);
    }
  }
  async function handleIncrement() {
    updateCartAmount(id, quantity + 1);
    editAmountCallback(quantity + 1);
    setQuantity(quantity + 1);
  }

  return (<Grid
  container
  spacing={2}
  sx={{
    alignItems: "center",
    padding: "20px 0",
    borderBottom: "1px solid #FFFFFF",
    textAlign: "center",
    color: "#FFFFFF",
  }}
>
  <Grid item xs={6} sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
    <img
      src=
      {
        imageSrc ? imageSrc : "https://i.pinimg.com/736x/ac/95/7c/ac957c328e655d4f18d89c58017f3da2.jpg"
      }
      alt="Product"
      style={{ width: "80px", height: "80px", borderRadius: "5px" }}
    />
    <div>
      <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
      <Button
        variant="outlined"
        sx={{
          marginTop: "10px",
          borderColor: "#FFFFFF",
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#FFFFFF", color: "#C8A68A" },
        }}
        onClick={(e: any) => { removeFromCart(id); deleteCallback(); }}
      >
        Remove
      </Button>
    </div>
  </Grid>

  <Grid item xs={2}>
    ${price.toFixed(2)}
  </Grid>

  <Grid item xs={2}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Button variant="outlined" onClick={(e: any) => handleDecrement()}>
        -
      </Button>
      <Typography>{quantity}</Typography>
      <Button variant="outlined" onClick={(e: any) => handleIncrement()}>
        +
      </Button>
    </Box>
  </Grid>

  <Grid item xs={2}>
    ${(price * quantity).toFixed(2)}
  </Grid>
</Grid>
  )
}