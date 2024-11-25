import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Modal from "@mui/joy/Modal";
import Box from "@mui/joy/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IProduct } from './IProduct';
import { addToCart } from "./APICalls";

export default function ProductCard({id, name, description, price, ingredients, weight }: IProduct) {
  const [isModalOpen, setModalOpen] = React.useState(false);

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

  async function onAddToCart(e: any, productId: string) {
    e.preventDefault();

    console.log(productId);
    let response = await addToCart(productId, 1);
    console.log(response);
  }

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Card sx={{ width: 240, height: 434, top: "2rem" }}>
        <AspectRatio minHeight="240px" maxHeight="200px">
          <img
            src=
            {
              imageSrc ? imageSrc : "https://i.pinimg.com/736x/ac/95/7c/ac957c328e655d4f18d89c58017f3da2.jpg"
            }
            loading="lazy"
            alt="Product Image"
          />
        </AspectRatio>
        <CardContent orientation="horizontal">
          <div>
            <Typography
              level="title-md"
              sx={{ fontSize: "lg", fontWeight: "lg" }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontSize: "md",
                fontWeight: "md",
                margin: "1rem",
                marginRight: "6rem",
              }}
            >
              ${price}
            </Typography>
            <Typography level="body-sm" sx={{ margin: "1rem" }}>
              {description}
            </Typography>
          </div>
        </CardContent>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                backgroundColor: "grey",
                color: "white",
                "&:hover": { backgroundColor: "darkgrey" },
              }}
              onClick={
                (e: any) => { 
                  console.log("CLICK"); 
                  onAddToCart(e, id);
                }
              }
            >
              <AddShoppingCartIcon />
            </Button>
            <Button
              sx={{
                left: "4rem",
                backgroundColor: "grey",
                color: "white",
                "&:hover": { backgroundColor: "darkgrey" },
              }}
              onClick={handleOpenModal}>

              <MoreHorizIcon />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          top: "-3rem",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1081,
            height: 674,
            bgcolor: "white",
            borderRadius: "1rem",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ justifySelf: "flex-start" }}>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: "Black",
                "&:hover": { backgroundColor: "darkgrey" },
              }}
              onClick={handleCloseModal}
            >
              <ArrowBackIcon sx={{ fontSize: "3rem" }} />
            </Button>
          </div>
          <AspectRatio
            sx={{
              width: 760,
              maxHeight: "386px",
              position: "relative", // Ensure the container is positioned for absolute children
              justifySelf: "center",
              top: "-3rem",
            }}
          >
            <img className="Image" />
            <img
              className="ProductImageModal"
              src=
              {
                imageSrc ? imageSrc : "https://i.pinimg.com/736x/ac/95/7c/ac957c328e655d4f18d89c58017f3da2.jpg"
              }
              style={{
               height:"300px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // Center horizontally and vertically
                zIndex: 1, // Ensure it appears on top
              }}
            />
          </AspectRatio>

          <Typography
            id="modal-title"
            fontSize="2rem"
            level="title-lg"
            component="h1"
            justifySelf="center"
          >
            {name}
          </Typography>
          <Typography
            id="modal-description"
            justifySelf="center"
            fontSize="1.5rem"
            sx={{ mt: 0 }}
          >
            ${price}
          </Typography>
          <Typography id="modal-description" justifySelf="start" sx={{ mt: 2 }}>
            Candle Description: {description}
          </Typography>
          <Typography id="modal-description" justifySelf="start" sx={{ mt: 2 }}>
            Ingredients: {ingredients}
          </Typography>
          <Typography id="modal-description" justifySelf="start" sx={{ mt: 2 }}>
            Size: {weight} oz
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                backgroundColor: "grey",
                color: "white",
                "&:hover": { backgroundColor: "darkgrey" },
              }}
              onClick={
                (e: any) => { 
                  console.log("CLICK"); 
                  onAddToCart(e, id);
                }
              }
            >
              <AddShoppingCartIcon />
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
