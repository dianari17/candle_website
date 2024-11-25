import * as React from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import Button from "@mui/material/Button";
import ProductCard from "../components/ProductCard";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import "../assets/Custom-Style-Sheets/christinasStyleSheet.css";

export default function ProductsPage() {
  return (
    <div>
      <NavigationBar />
      <div
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "#644934",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      ></div>
      <Box sx={{ flexGrow: 1, mt: "9rem", ml: "15rem" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: "2rem" }}>
          <Button variant="contained" sx={{ mr: "1rem" }}>
            Search
          </Button>
          <TextField
            placeholder="Search products..."
            variant="outlined"
            sx={{ width: "60%", backgroundColor: "white" }}
          />
        </Box>
        <Grid container spacing={4}>
          <Grid item lg={3}>
            <ProductCard />
          </Grid>
          <Grid item lg={3}>
            <ProductCard />
          </Grid>
          <Grid item lg={3}>
            <ProductCard />
          </Grid>
          <Grid item lg={3}>
            <ProductCard />
          </Grid>
          <Grid item lg={3}>
            <ProductCard />
          </Grid>
          <Grid item lg={3}>
            <ProductCard />
          </Grid>
          <Grid item lg={3}>
            <ProductCard />
          </Grid>
          <Grid item lg={3}>
            <ProductCard />
          </Grid>
        </Grid>
      </Box>
      <Stack spacing={2} justifySelf="center" sx={{ mt: "5rem", mb: "3rem" }}>
        <Pagination
          count={10}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
              sx={{ backgroundColor: "white" }}
            />
          )}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
      <Footer />
    </div>
  );
}
