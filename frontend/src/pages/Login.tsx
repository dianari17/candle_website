import React from "react";
import LoginForm from "../components/loginForm";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../assets/brandLogo";
import FormDecor from "../assets/FormDecor.svg";

import "../assets/Login.css";

const Login = () => {
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
        <img src={FormDecor}/>
      </div>
      <div className="BackButton">
        <Button onClick={moveHome}>
          <ArrowBackIcon sx={{ height: "4rem", width: "3rem" }} />
        </Button>
      </div>
    </div>
  );
};

export default Login;
