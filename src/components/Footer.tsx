import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Footer = () => (
  <AppBar position="static" color="primary">
    <Toolbar
      style={{ marginLeft: "auto", marginRight: "auto", padding: "0.6rem" }}
    >
      <Typography variant="body1" color="inherit">
        Project is powered by{" "}
        <a href="http://project-osrm.org/">"Open Source Route Machine"</a> and{" "}
        <a href="https://developer.here.com/products/geocoding-and-search">
          {" "}
          "Here"
        </a>
        API.
        <br />
        All rights reserved &copy; {new Date().getFullYear()}.
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Footer;
