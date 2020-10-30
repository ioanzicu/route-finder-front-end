import React from "react";
import "./App.css";
import Form from "./Form";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container maxWidth="md">
      <div className="App">
        <h1>Epic Route Finder Front End</h1>

        <hr />
        <Form />
      </div>
    </Container>
  );
}

export default App;
