import React from "react";
import RouteImage from "../images/route.png";

const Landing = () => (
  <div
    style={{
      backgroundImage: `url(${RouteImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "77.6vh",
    }}
  ></div>
);

export default Landing;
