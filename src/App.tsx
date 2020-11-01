import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form";
import InputLocation from "./Input";
import Container from "@material-ui/core/Container";

function App() {
  const [coordinates, setCoodinates] = useState<{
    longitude: string;
    latitude: string;
    locationName: string;
  }>({ longitude: "", latitude: "", locationName: "" });

  useEffect(() => {
    console.log("Coordinates are loaded");
  }, [coordinates]);

  return (
    <Container maxWidth="md">
      <div className="App">
        <h1>Epic Route Finder Front End</h1>

        <hr />
        <Form />
        <hr />
        <InputLocation setCoodinates={setCoodinates} />
      </div>
      <p>Coordinates:</p>
      {coordinates && JSON.stringify(coordinates)}
    </Container>
  );
}

export default App;
