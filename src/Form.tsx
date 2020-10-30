import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useFormStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const useTableStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface Route {
  destination: string;
  duration: string;
  distance: string;
}

export interface Data {
  source: string;
  routes: Route[];
}

export default function Form() {
  const classesForm = useFormStyles();
  const classesTable = useTableStyles();

  const [sourceLatitude, setSourceLatitude] = useState<string>("");
  const [sourceLongitude, setSourceLongitude] = useState<string>("");

  const [destinationLatitude, setDestinationLatitude] = useState<string>("");
  const [destinationLongitude, setDestinationLongitude] = useState<string>("");

  const [data, setData] = useState<Data>();

  useEffect(() => {
    console.log("Data is loaded");
  }, [data]);

  // localhost:8080/routes?src=13.388860,52.517037&dst=13.397634,52.529407&dst=13.428555,52.523219
  const getRoutes = () => {
    const apiUrl = `http://localhost:8080/routes?src=${sourceLatitude},${sourceLongitude}&dst=${destinationLatitude},${destinationLongitude}`;
    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((er) => console.log("Error to fetch: ", er));
  };

  const handleSourceLatitude = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSourceLatitude(event.target.value);
  };

  const handleSourceLongitude = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSourceLongitude(event.target.value);
  };

  const handleDestinationLatitude = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDestinationLatitude(event.target.value);
  };

  const handleDestinationLongitude = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDestinationLongitude(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    console.log("Source:");
    console.log("Longitude:", sourceLongitude, " - Latitude: ", sourceLatitude);

    console.log("Destination:");
    console.log(
      "Longitude:",
      destinationLongitude,
      " - Latitude: ",
      destinationLatitude
    );

    getRoutes();
    console.log("data:", data);
  };

  const latitudeProps = {
    step: 0.000001,
    max: 90,
    min: -90,
  };

  const longitudeProps = {
    step: 0.000001,
    max: 180,
    min: -180,
  };

  const metersToKm = (meters: string): string => {
    let km = (+meters / 1000).toFixed(2);
    return `${km} kilometers`;
  };

  const secondsToMinutes = (seconds: string): string => {
    let minutes = (+seconds / 60).toFixed(2);
    return `${minutes} minutes`;
  };

  return (
    <div>
      <h2>Enter the home geographical coordinates</h2>
      <form
        className={classesForm.root}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <TextField
          id="standard-source-latitude"
          value={sourceLatitude}
          type="number"
          size="small"
          inputProps={latitudeProps}
          required
          onChange={handleSourceLatitude}
          label="Latitude"
          helperText="Example: 50.2649"
        />

        <TextField
          id="standard-source-longitude"
          value={sourceLongitude}
          type="number"
          inputProps={longitudeProps}
          size="small"
          required
          onChange={handleSourceLongitude}
          label="Longitude"
          helperText="Example: 19.0238"
        />

        <hr />

        <h2>Enter the destination geographical coordinates</h2>
        <TextField
          id="standard-destination-latitude"
          value={destinationLatitude}
          type="number"
          inputProps={latitudeProps}
          size="small"
          required
          onChange={handleDestinationLatitude}
          label="Latitude"
          helperText="Example: 50.2649"
        />

        <TextField
          id="standard-destination-longitude"
          value={destinationLongitude}
          type="number"
          inputProps={longitudeProps}
          size="small"
          required
          onChange={handleDestinationLongitude}
          label="Longitude"
          helperText="Example: 19.0238"
        />

        <div>
          <br />
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </div>
      </form>

      <br />

      <div>{data && JSON.stringify(data)}</div>

      <TableContainer component={Paper}>
        {data && data.routes && data.routes.length > 0 && (
          <Table className={classesTable.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell align="right">Destination</TableCell>
                <TableCell align="right">Duration (seconds)</TableCell>
                <TableCell align="right">Distance (meters)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.routes.map((row: Route, index: number) => (
                <TableRow key={row.destination + index}>
                  <TableCell component="th" scope="row">
                    {data.source}
                  </TableCell>
                  <TableCell align="right">{row.destination}</TableCell>
                  <TableCell align="right">
                    {row.duration} seconds | {secondsToMinutes(row.duration)}
                  </TableCell>
                  <TableCell align="right">
                    {row.distance} meters | {metersToKm(row.distance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}
