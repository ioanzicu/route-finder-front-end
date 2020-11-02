import React from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

const About = () => (
  <div
    style={{
      height: "65vh",
      paddingTop: "5.2rem",
    }}
  >
    <Container component={Paper} maxWidth="md">
      <div
        style={{
          lineHeight: "2rem",
          fontSize: "1.1rem",
          padding: "2rem",
        }}
      >
        <h1>About Project</h1>
        <hr />
        <div>
          Route finder project allow the users to get information (distance and
          time) about the routes from the source location to the one or many
          destinations.
          <br />
          The routes are consumed from the{" "}
          <a href="http://project-osrm.org/">"OSRM Project"</a>.
          <br />
          If the user don't know the longitude and latitude, he/she can get them
          by searching the city/village location.
          <br />
          The search by location is powered by the{" "}
          <a href="https://developer.here.com/products/geocoding-and-search">
            "Here"
          </a>{" "}
          API.
        </div>
      </div>
    </Container>
  </div>
);

export default About;
