import React from 'react';
import "../assets/aboutUs";
import TestBut from '../components/TestBut';
import AboutUs from '../assets/aboutUs';
const AboutPage = () => {
  return (
    <div
    >
      <TestBut />
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
      <AboutUs />
    </div>
  );
};

export default AboutPage;

