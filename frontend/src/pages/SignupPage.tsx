import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../assets/Custom-Assets/brandLogo";
import FormDecor2 from "../assets/SVGs-Assets/FormDecor2.svg";
import SignUp from "../components/Form-Components/signUpForm";
import "../assets/Custom-Style-Sheets/Login.css";
import Typography from "@mui/material/Typography";

const SignUpPage = () => {
  const navigate = useNavigate();

  function movelogin() {
    navigate("/login");
  }

  return (
    <div className="SignUp-page">
      <div>
        <BrandLogo
          className="Logo"
          style={{
            height: "172px",
            width: "470px",
            marginLeft: "1rem",
            marginTop: "0.5rem",
          }}
        />
      </div>
      <div className="login-form">
        <SignUp />
      </div>
      <div className="background-svg">
        <img src={FormDecor2} />
      </div>
      <div className="BackButton">
        <Button onClick={movelogin}>
          <ArrowBackIcon sx={{ height: "4rem", width: "3rem" }} />
          <Typography sx={{ padding: "1rem" }}>Back to Log in</Typography>
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
