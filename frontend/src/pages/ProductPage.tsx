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
import { IProduct } from '../components/IProduct';
import { searchProduct } from "../components/APICalls";

export default function ProductsPage() {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [numPages, setNumPages] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState('');

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
      setCurrentPage(pageNum);
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
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      ></div>
      <Box sx={{ flexGrow: 1, mt: "9rem", ml: "15rem" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: "2rem" }}>
          <Button 
            variant="contained" 
            sx={{ mr: "1rem" }}
            onClick={(e: any) => getProducts(search, 1)}
          >
            Search
          </Button>
          <TextField
            placeholder="Search products..."
            variant="outlined"
            sx={{ width: "60%", backgroundColor: "white" }}
            onChange={(e: any)=> setSearch(e.target.value) }
          />
        </Box>
        <Grid container spacing={4}>
          {
            products.map((product, index) => {
              return <Grid item lg={3} key={index}>
                <ProductCard {...product}/>
              </Grid>
            })
          }
        </Grid>
      </Box>
      <Stack spacing={2} justifySelf="center" sx={{ mt: "5rem", mb: "3rem" }}>
        <Pagination
          count={numPages}
          page={currentPage}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
              sx={{ backgroundColor: "white" }}
              onClick={()=>item.page ? getProducts('', item.page) : ''}
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
