import React from "react";
import { Carousel } from "antd";
import "../assets/Custom-Style-Sheets/christinasStyleSheet.css";
import leftArrow from "../assets/SVGs-Assets/CustomPrevButton.svg";
import rightArrow from "../assets/SVGs-Assets/CustomNextButton.svg";

const contentStyle: React.CSSProperties = {
  height: "461px",
  color: "#A48A79",
  lineHeight: "461px",
  textAlign: "center",
  background: "#F6F2EE",
  fontSize: "24px",
  borderRadius: "15px",
};


const CustomLeftArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "55%",
      transform: "translateY(-50%)",
      zIndex: 10,
      cursor: "pointer",
    }}
  >
    <img src={leftArrow} alt="Previous" width={111} height={203} />
  </div>
);


const CustomRightArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "55%",
      right: "0px",
      transform: "translateY(-50%)",
      zIndex: 10,
      cursor: "pointer",
    }}
  >
    <img src={rightArrow} alt="Next" width={111} height={203} />
  </div>
);

const CustomCarousel: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Carousel
        className="custom-carousel"
        dotPosition="bottom"
        style={{
          width: "1210px",
          height: "461px",

        }}
        arrows 
        prevArrow={<CustomLeftArrow />}
        nextArrow={<CustomRightArrow />}
        autoplay
        autoplaySpeed={3500}
      >
        <div>
          <h3 style={contentStyle}>Slide 1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Slide 2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Slide 3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Slide 4</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
