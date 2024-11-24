import React from "react";
import LoginForm from "../components/Form-Components/loginForm";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../assets/Custom-Assets/brandLogo";
import FormDecor from "../assets/SVGs-Assets/FormDecor.svg";
import Typography from "@mui/material/Typography";

import "../assets/Custom-Style-Sheets/Login.css";

const LoginPage = () => {
  const navigate = useNavigate();

  function moveHome() {
    navigate("/");
  }

  return (
    <div className="login-page">
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
        <LoginForm />
      </div>
      <div className="background-svg">
        <img src={FormDecor} />
      </div>
      <div className="BackButton">
        <Button onClick={moveHome}>
          <ArrowBackIcon sx={{ height: "4rem", width: "3rem" }} />
          <Typography sx={{ padding: "1rem" }}>Back to Homepage</Typography>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
