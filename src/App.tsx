import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form";
import InputLocation from "./Input";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { ICoordinates } from "./types/CustomTypes";
import { StyledTableCell } from "./styles/CustomStyles";

const useTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        marginLeft: "auto",
        marginRight: "auto",
        width: theme.spacing(60),
      },
    },
  })
);

function App() {
  const [coordinates, setCoodinates] = useState<ICoordinates>({
    longitude: "",
    latitude: "",
    locationLabel: "",
    country: "",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    postalCode: "",
  });

  useEffect(() => {
    console.log("Coordinates are loaded");
  }, [coordinates]);

  const mockData = {
    longitude: "18.0081",
    latitude: "53.11931",
    locationLabel: "Bydgoszcz, Woj. Kujawsko-Pomorskie, Polska",
    country: "POL",
    state: "Woj. Kujawsko-Pomorskie",
    city: "Bydgoszcz",
    street: "Some Street",
    houseNumber: "23",
    postalCode: "85-023",
  };

  const classesTable = useTableStyles();

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
      {mockData && (
        <div className={classesTable.root}>
          <TableContainer component={Paper}>
            <TableHead>
              {mockData.locationLabel && (
                <TableRow>
                  <StyledTableCell align="center" colSpan={2}>
                    <h2>{mockData.locationLabel}</h2>
                  </StyledTableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {mockData.longitude && (
                <TableRow>
                  <TableCell>Longitude:</TableCell>
                  <TableCell> {mockData.longitude}</TableCell>
                </TableRow>
              )}
              {mockData.latitude && (
                <TableRow>
                  <TableCell>Latitude:</TableCell>
                  <TableCell> {mockData.latitude}</TableCell>
                </TableRow>
              )}
              {mockData.country && (
                <TableRow>
                  <TableCell>Country:</TableCell>
                  <TableCell> {mockData.country}</TableCell>
                </TableRow>
              )}
              {mockData.state && (
                <TableRow>
                  <TableCell>State:</TableCell>
                  <TableCell> {mockData.state}</TableCell>
                </TableRow>
              )}
              {mockData.city && (
                <TableRow>
                  <TableCell>City:</TableCell>
                  <TableCell> {mockData.city}</TableCell>
                </TableRow>
              )}
              {mockData.street && (
                <TableRow>
                  <TableCell>Street:</TableCell>
                  <TableCell> {mockData.street}</TableCell>
                </TableRow>
              )}
              {mockData.houseNumber && (
                <TableRow>
                  <TableCell>House Number:</TableCell>
                  <TableCell> {mockData.houseNumber}</TableCell>
                </TableRow>
              )}
              {mockData.postalCode && (
                <TableRow>
                  <TableCell>Postal Code:</TableCell>
                  <TableCell> {mockData.postalCode}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableContainer>
        </div>
      )}
      {coordinates && JSON.stringify(coordinates)}
    </Container>
  );
}

export default App;
