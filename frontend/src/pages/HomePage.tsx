import TestUI from "../components/TestUI";
import NavigationBar from "../components/NavigationBar";
import CustomCarousel from "../components/CustomCarousel";

const HomePage = () => {
  return (
    <div>
      <NavigationBar />
      <div
        style={{
          backgroundImage: `url('/frame.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "#CCC0C4",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      ></div>
      <CustomCarousel/>
    </div>
  );
};
export default HomePage;
