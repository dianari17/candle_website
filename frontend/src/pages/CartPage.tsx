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
import { getCart } from "../components/APICalls";
import CartProduct from "../components/CartProduct";

import "../assets/Custom-Style-Sheets/Login.css";

const CartPage = () => {
  const navigate = useNavigate();


  const [cart, setCart] = useState<IProduct[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  function moveProducts() {
    navigate("/products");
  }
  function moveCheckout() {
    navigate("/checkout");
  }

  async function updateCart() {
    let res = await getCart();

    if(res.error) {
      console.error(res.error);
    }
    else {
      setCart(res.products);
      calculateSubtotal(res.products);
    }
  }

  // Update cart locally
  function deleteFromCart(id : string)  {
    const newCart = cart.filter((cartProduct) => cartProduct.id !== id);
    setCart(newCart);
    calculateSubtotal(newCart);
  }
  function editAmountInCart(id: string, quantity: number) {
    console.log("UPdating");
    cart.forEach((product : IProduct) => {
      if(product.id === id) {
        product.amount = quantity;
      }
    });
    calculateSubtotal(cart);
  }

  function calculateSubtotal(products : IProduct[]) {
    let subtotal = 0;
    products.forEach((product : IProduct) => { 
      subtotal += (product.amount * product.price);
    });
    setSubtotal(subtotal);
  }

  React.useEffect(() => { updateCart() }, []);

  return (
    <Box className="Cart-page" sx={{ backgroundColor: "#C8A68A", minHeight: "100vh", padding: "20px" }}>
      
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
            sx={{
              fontSize: "4rem", // Increase the font size
              fontWeight: "300", // Use lighter weight for Sansation Light
              textAlign: "center", // Center the text
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
              fontFamily: "'Sansation', sans-serif", // Specify Sansation with fallback
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

      <Box sx={{ marginTop: "30px", padding: "20px", backgroundColor: "#C8A68A", borderRadius: "10px" }}>
        <Grid
          container
          spacing={2}
          sx={{
            borderBottom: "1px solid #FFFFFF",
            padding: "10px 0",
            textAlign: "center",
            fontWeight: "bold",
            color: "#FFFFFF",
          }}
        >
          <Grid item xs={6}>
            Product
          </Grid>
          <Grid item xs={2}>
            Price
          </Grid>
          <Grid item xs={2}>
            Quantity
          </Grid>
          <Grid item xs={2}>
            Total
          </Grid>
        </Grid>

        {
          cart.map((product, index) => {
            return <CartProduct 
            {...product} 
            key={index} 
            deleteCallback={() => deleteFromCart(product.id) }
            editAmountCallback={(quantity: number) => editAmountInCart(product.id, quantity)}
            />
          })
        }
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ fontSize: "1.2rem", color: "#FFFFFF" }}>
            Subtotal: ${subtotal.toFixed(2)} USD
          </Typography>
          <Typography variant="body2" sx={{ color: "#FFFFFFAA" }}>
            Taxes and shipping calculated at checkout
          </Typography>
        </Box>
        <Button onClick={moveCheckout}
          variant="contained"
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#C8A68A",
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: "10px 20px",
            "&:hover": { backgroundColor: "#C8A68A", color: "#FFFFFF" },
          }}
        >
          Checkout
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};

export default CartPage;
