import React from "react";
import "./App.css";
import Form from "./components/Form";
import Container from "@material-ui/core/Container";
import SeachByLocation from "./components/SearchByLocation";

function App() {
  return (
    <Container maxWidth="md">
      <div className="App">
        <h1>Epic Route Finder Front End</h1>
        <hr />
        <Form />
        <hr />
        <SeachByLocation />
      </div>
    </Container>
  );
}

export default App;
