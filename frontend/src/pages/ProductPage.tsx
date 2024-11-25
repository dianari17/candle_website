import * as React from "react";
import NavigationBar from "../components/NavigationBar";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import ProductCard from "../components/ProductCard";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid";
import "../assets/Custom-Style-Sheets/christinasStyleSheet.css";
import { IProduct } from '../components/IProduct';
import { searchProduct } from "../components/APICalls";

export default function ProductsPage() {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [numPages, setNumPages] = React.useState<number>(0);

  async function getProducts(search: string, pageNum: number) {
    let res : {products: IProduct[], numPages: number, error: string } = await searchProduct(search, pageNum, 4);
    
    if(res.error)
    {
      console.error(res.error);
    }
    else
    {
      setProducts(res.products);
      setNumPages(res.numPages);
    }
  }

  React.useEffect(() => { getProducts('', 1) }, []);

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
          position: "fixed", //Changed from Absolute to Fixed to make it fill the page
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      ></div>
      <Box sx={{ flexGrow: 1, mt: "9rem", ml: "15rem" }}>
        <Grid container spacing={4}>
          {
            products.map((product, index) => {
              return <Grid item lg={3} key={index}>
                <ProductCard {...product}/>
              </Grid>
            })
          }
          {/* <Grid item lg={3}>
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
          </Grid> */}
        </Grid>
      </Box>
      <Stack spacing={2} justifySelf="center" sx={{ mt: "5rem", mb:"3rem" }}>
        <Pagination
          count={numPages}
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
    </div>
  );
}
