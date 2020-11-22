import React from "react";
import Button from "@material-ui/core/Button";
import RouteImage from "../images/route.png";
import { Link } from "react-router-dom";

const Landing = () => (
  <div
    style={{
      backgroundImage: `url(${RouteImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "77.6vh",
    }}
  >
    <div style={{ 
      margin: "0",
      position: "absolute",
      top: "50%",
      left: "50%",
      msTransform: "translate(-50%, -50%)",
      transform: "translate(-50%, -50%)"
      }}
    >
      <span style={{ position: "relative" }}>
        <Button style={{ 
          opacity: "0.95",
          height: "3rem",
          width: "13rem",
          fontSize: "1.5rem" 
          }} variant="contained" type="submit" color="primary">
          <Link to="/route">Find Route</Link>
        </Button>
      </span>
    </div>
  </div>
);

export default Landing;
