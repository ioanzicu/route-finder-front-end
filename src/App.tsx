import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import SeachByLocation from "./components/SearchByLocation";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <h1 style={{ textAlign: "center" }}>
          <LocalShippingIcon
            style={{ marginBottom: "-0.5rem", paddingRight: "1rem" }}
            fontSize="large"
          />
          Route Finder
        </h1>
      </AppBar>

      <Container maxWidth="md">
        <br />
        <Form />
        <hr />
        <SeachByLocation />
      </Container>

      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            &copy; 2020
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
