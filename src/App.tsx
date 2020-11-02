import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

import RouteImage from "./images/route.png";
import SeachByLocation from "./components/SearchByLocation";
import Form from "./components/Form";
import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";

const useNavStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 2,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function App() {
  const navBarClasses = useNavStyles();

  return (
    <Router>
      <div className={navBarClasses.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={navBarClasses.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <LocalShippingIcon fontSize="large" />
            </IconButton>
            <Typography variant="h4" className={navBarClasses.title}>
              Route Finder
            </Typography>
            <Button color="inherit">
              <Link to="/">Home</Link>
            </Button>
            <Button color="inherit">
              <Link to="/route">Route Info</Link>
            </Button>
            <Button color="inherit">
              <Link to="/about">About</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <div className="App">
        <Switch>
          <Route path="/about">
            <div
              style={{
                height: "78vh",
              }}
            >
              <About />
            </div>
          </Route>
          <Route path="/route">
            <Container maxWidth="md">
              <Form />
              <SeachByLocation />
            </Container>
          </Route>

          <Route path="/">
            <div
              style={{
                backgroundImage: `url(${RouteImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "78vh",
              }}
            ></div>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
