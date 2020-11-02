import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import SeachByLocation from "./components/SearchByLocation";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <div>
      <AppBar position="static">
        <h1 style={{ textAlign: "center" }}>
          <LocalShippingIcon
            style={{ marginBottom: "-0.5rem" }}
            fontSize="large"
          />{" "}
          Route Finder
        </h1>
      </AppBar>

      <Container maxWidth="md">
        <div className="App">
          <hr />
          <Form />
          <hr />
          <SeachByLocation />
        </div>
      </Container>
    </div>
  );
}

export default App;
