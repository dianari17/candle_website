import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../assets/brandLogo";
import FormDecor2 from "../assets/FormDecor2.svg";
import SignUp from "../components/signUpForm";
import "../assets/Login.css";

const Login = () => {
  const navigate = useNavigate();

  function moveHome() {
    navigate("/");
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
        <SignUp/>
      </div>
      <div className="background-svg">
        <img src={FormDecor2} />
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
