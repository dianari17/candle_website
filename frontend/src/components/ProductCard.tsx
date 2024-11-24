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

export default function ProductCard() {
  const [isModalOpen, setModalOpen] = React.useState(false);

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
            src="https://i.pinimg.com/736x/ac/95/7c/ac957c328e655d4f18d89c58017f3da2.jpg"
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
              Candle Name
            </Typography>
            <Typography
              sx={{
                fontSize: "md",
                fontWeight: "md",
                margin: "1rem",
                marginRight: "6rem",
              }}
            >
              $--
            </Typography>
            <Typography level="body-sm" sx={{ margin: "1rem" }}>
              Candle Description
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
              onClick={handleOpenModal}
            >
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
              src="https://i.pinimg.com/736x/ac/95/7c/ac957c328e655d4f18d89c58017f3da2.jpg"
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
            Candle Name
          </Typography>
          <Typography
            id="modal-description"
            justifySelf="center"
            fontSize="1.5rem"
            sx={{ mt: 0 }}
          >
            $--
          </Typography>
          <Typography id="modal-description" justifySelf="start" sx={{ mt: 2 }}>
            Candle Description:
          </Typography>
          <Typography id="modal-description" justifySelf="start" sx={{ mt: 2 }}>
            Ingredients:
          </Typography>
          <Typography id="modal-description" justifySelf="start" sx={{ mt: 2 }}>
            Size:
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                backgroundColor: "grey",
                color: "white",
                "&:hover": { backgroundColor: "darkgrey" },
              }}
            >
              <AddShoppingCartIcon />
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
