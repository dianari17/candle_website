import React from "react";
import "../assets/Custom-Assets/aboutUs";
import NavigationBar from "../components/NavigationBar";
import AboutUs from "../assets/Custom-Assets/aboutUs";
const AboutPage = () => {
  return (
    <div>
      <NavigationBar />
      <div
        style={{
          backgroundImage: `url('/frame.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "#644934",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      ></div>
      <div style={{marginTop:"10rem"}}>
        <AboutUs />
      </div>
     
    </div>
  );
};

export default AboutPage;
