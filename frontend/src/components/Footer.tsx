import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
 
     <Box
     sx={{
       marginTop: "50px",
       textAlign: "center",
       color: "#FFFFFF",
     }}
   >
     <Typography variant="h6">Contact Us!</Typography>
     <Typography>(###)-###-####</Typography>
     <Typography>EMAIL@GMAIL.COM</Typography>
     <Box
       sx={{
         display: "flex",
         justifyContent: "center",
         gap: "20px",
         marginTop: "10px",
       }}
     >
       <img
         src="https://via.placeholder.com/50" // Replace with your Instagram icon
         alt="Instagram"
         style={{ width: "40px", height: "40px" }}
       />
       <img
         src="https://via.placeholder.com/50" // Replace with your Facebook icon
         alt="Facebook"
         style={{ width: "40px", height: "40px" }}
       />
     </Box>
   </Box>
  );
};

export default Footer;
