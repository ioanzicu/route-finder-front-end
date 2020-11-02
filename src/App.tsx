import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import SeachByLocation from "./components/SearchByLocation";
import Form from "./components/Form";
import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";

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

      <br />

      <br />
      <br />
      <About />

      <br />
      <br />
      <br />

      <Container maxWidth="md">
        <br />
        <Form />
        <hr />
        <SeachByLocation />
      </Container>
      <br />
      <Footer />
    </div>
  );
}

export default App;
