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
import HomeIcon from "@material-ui/icons/Home";
import FlagIcon from "@material-ui/icons/Flag";
import TimerIcon from "@material-ui/icons/Timer";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

const useFormStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
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

const mockData = {
  source: "13.38886,52.517037",
  routes: [
    {
      destination: "13.397634,52.529407",
      duration: "251.5",
      distance: "1884.8",
    },
  ],
};

export default function Form() {
  const classesForm = useFormStyles();
  const classesTable = useTableStyles();

  const [sourceLatitude, setSourceLatitude] = useState<string>("");
  const [sourceLongitude, setSourceLongitude] = useState<string>("");

  const [inputList, setInputList] = useState<
    { latitude: string; longitude: string }[]
  >([{ latitude: "", longitude: "" }]);

  const [data, setData] = useState<Data>();

  useEffect(() => {
    console.log("Data is loaded");
  }, [data]);

  // localhost:8080/routes?src=13.388860,52.517037&dst=13.397634,52.529407&dst=13.428555,52.523219
  const getRoutes = () => {
    let destinaions: string = "";
    inputList.map(
      (destination: { latitude: string; longitude: string }, index: number) =>
        (destinaions += `&dst=${destination.latitude},${destination.longitude}`)
    );

    const apiUrl = `http://localhost:8080/routes?src=${sourceLatitude},${sourceLongitude}${destinaions}`;
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    console.log("Source:");
    console.log("Longitude:", sourceLongitude, " - Latitude: ", sourceLatitude);

    console.log("Destination:");
    inputList.map((dst, index) =>
      console.log(
        `Destination: ${index + 1} |  Latitude: ${dst.latitude} - Longitude: ${
          dst.longitude
        }`
      )
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ): void => {
    const { name, value } = event.target;
    const list: any = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { latitude: "", longitude: "" }]);
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

        {inputList &&
          inputList.map((destination, index) => {
            return (
              <div key={index * index}>
                <TextField
                  id="standard-source-latitude"
                  value={destination.latitude}
                  type="number"
                  size="small"
                  name="latitude"
                  inputProps={latitudeProps}
                  required
                  onChange={(event) => handleInputChange(event, index)}
                  label="Latitude"
                  helperText="Example: 50.2649"
                />

                <TextField
                  id="standard-source-longitude"
                  value={destination.longitude}
                  type="number"
                  inputProps={longitudeProps}
                  size="small"
                  name="longitude"
                  required
                  onChange={(event) => handleInputChange(event, index)}
                  label="Longitude"
                  helperText="Example: 19.0238"
                />
                <span>
                  {inputList.length !== 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleRemoveClick(index)}
                    >
                      Remove
                    </Button>
                  )}

                  <br />

                  {inputList.length - 1 === index && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddClick}
                    >
                      Add
                    </Button>
                  )}
                </span>
              </div>
            );
          })}
        <hr />
        {JSON.stringify(inputList)}
        <br />

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
        {mockData && mockData.routes && mockData.routes.length > 0 && (
          <Table className={classesTable.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Source <HomeIcon />
                </TableCell>
                <TableCell align="right">
                  Destination <FlagIcon />
                </TableCell>
                <TableCell align="right">
                  Duration (seconds) <TimerIcon />
                </TableCell>
                <TableCell align="right">
                  Distance (meters)
                  <LocalShippingIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.routes.map((row: Route, index: number) => (
                <TableRow key={row.destination + index}>
                  <TableCell component="th" scope="row">
                    {mockData.source}
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
