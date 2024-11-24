import TestUI from "../components/TestUI";
import TestBut from "../components/TestBut";

const HomePage = () => {
  return (
    <div>
      <TestBut />
      <div
        style={{
          backgroundImage: `url('/frame.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      ></div>
      <TestUI />
    </div>
  );
};
export default HomePage;
