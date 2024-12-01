import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleIcon, FacebookIcon } from "./customIcons";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { addProduct } from "../APICalls";
import { useNavigate } from "react-router-dom";
import { ImageList } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#644934",
    },
  },
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

function AddProduct(props: { disableCustomTheme?: boolean }) {
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const [descError, setDescError] = React.useState(false);
  const [descErrorMessage, setDescErrorMessage] = React.useState("");

  const [priceError, setPriceError] = React.useState(false);
  const [priceErrorMessage, setPriceErrorMessage] = React.useState("");
  
  const [ingredError, setIngredError] = React.useState(false);
  const [ingredErrorMessage, setIngredErrorMessage] = React.useState("");

  const [weightError, setWeightError] = React.useState(false);
  const [weightErrorMessage, setWeightErrorMessage] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello world");
    if(nameError || descError || priceError || ingredError || weightError) {
        return;
    }

    const name = document.getElementById("name") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const ingredients = document.getElementById("ingredients") as HTMLInputElement;
    const price = document.getElementById("price") as HTMLInputElement;
    const weight = document.getElementById("weight") as HTMLInputElement;
    const image = document.getElementById("productImage") as HTMLInputElement;

    if(!image.files) { return; }
    const response = await addProduct(name.value, description.value, price.value, 
                weight.value, ingredients.value, image.files[0]);
  };
  

  const validateInputs = () => {
    const name = document.getElementById("name") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const ingredients = document.getElementById("ingredients") as HTMLInputElement;
    const price = document.getElementById("price") as HTMLInputElement;
    const weight = document.getElementById("weight") as HTMLInputElement;

    let isValid = true;

    if(!name.value){
      setNameError(true);
      setNameErrorMessage("Please enter a product name.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if(!description.value){
      setDescError(true);
      setDescErrorMessage("Please enter a product description.");
    } else {
      setDescError(false);
      setDescErrorMessage("");
    }

    if(!ingredients.value) {
        setIngredError(true);
        setIngredErrorMessage("Please enter the ingredients of this product.");
    } else {
        setIngredError(false);
        setIngredErrorMessage("");
    }

    if(!Number(price.value)) {
        setPriceError(true);
        setPriceErrorMessage("Please enter a valid price. (Numeric only)");
    } else {
        setPriceError(false);
        setPriceErrorMessage("");
    }

    if(!Number(weight.value)) {
        setWeightError(true);
        setWeightErrorMessage("Please enter a valid weight. (Numeric only)");
    } else {
        setWeightError(false);
        setWeightErrorMessage("");
    }
    
    
    return isValid;
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              color: "black",
              textAlign: "left",
            }}
          >
            Add a Product
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
              textAlign: "left",
            }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Product Name</FormLabel>
              <TextField
                error={nameError}
                helperText={nameErrorMessage}
                id="name"
                type="text"
                name="name"
                placeholder="Candle"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={nameError ? "error" : "primary"}
              />
              </FormControl>
              <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                error={descError}
                helperText={descErrorMessage}
                id="description"
                type="text"
                name="description"
                placeholder="A candle that..."
                autoComplete="description"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={descError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="price">Price</FormLabel>
              <TextField
                error={priceError}
                helperText={priceErrorMessage}
                id="price"
                type="text"
                name="price"
                placeholder="12.99"
                autoComplete="price"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={priceError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Ingredients</FormLabel>
              <TextField
                error={ingredError}
                helperText={ingredErrorMessage}
                id="ingredients"
                type="text"
                name="ingredients"
                placeholder="Ingredients..."
                autoComplete="ingredients"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={ingredError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="weight">Weight</FormLabel>
              <TextField
                error={weightError}
                helperText={weightErrorMessage}
                id="weight"
                type="text"
                name="weight"
                placeholder="5"
                autoComplete="weight"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={weightError ? "error" : "primary"}
              />
            </FormControl>
             Image: <input type="file" id="productImage" />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Add Product
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </ThemeProvider>
  );
}

export default AddProduct;