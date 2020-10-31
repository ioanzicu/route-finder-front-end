import React from "react";
import "./App.css";
import Form from "./Form";
import InputLocation from "./Input";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container maxWidth="md">
      <div className="App">
        <h1>Epic Route Finder Front End</h1>

        <hr />
        <Form />
        <hr />
        <InputLocation />
      </div>
    </Container>
  );
}

export default App;
