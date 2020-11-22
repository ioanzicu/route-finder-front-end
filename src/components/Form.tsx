import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import FlagIcon from "@material-ui/icons/Flag";
import TimerIcon from "@material-ui/icons/Timer";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";

import {
  StyledTableCell,
  useFormStyles,
  useTableStyles,
} from "../styles/CustomStyles";
import { metersToKm, secondsToMinutes } from "../utils/Utils";
import { IRoute, IData, InputList } from "../types/CustomTypes";

// const mockData = {
//   source: "13.38886,52.517037",
//   routes: [
//     {
//       destination: "13.397634,52.529407",
//       duration: "251.5",
//       distance: "1884.8",
//     },
//   ],
// };

export default function Form() {
  const classesForm = useFormStyles();
  const classesTable = useTableStyles();

  const [sourceLatitude, setSourceLatitude] = useState<string>("");
  const [sourceLongitude, setSourceLongitude] = useState<string>("");

  const [inputList, setInputList] = useState<InputList[]>([
    { latitude: "", longitude: "" },
  ]);

  const [data, setData] = useState<IData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");

  useEffect(() => {
    console.log("Data is loaded");
  }, [data]);

  const fetchData = async (url: string) => {
    try {
      // request data
      setLoading(true);
      const data = await fetch(url, {
        method: "GET",
      });
      const json = await data.json();
      // success
      if (json) {
        setLoading(false);
        setData(json);
      }
    } catch (error) {
      // fail
      setLoading(false);
      setFetchError(error.message);
      console.log("Error to fetch: ", error.message);
    }

    setLoading(false);
  };

  // localhost:8080/routes?src=13.388860,52.517037&dst=13.397634,52.529407&dst=13.428555,52.523219
  const getRoutes = () => {
    let destinaions: string = "";
    inputList.map(
      (destination: InputList, index: number) =>
        (destinaions += `&dst=${destination.longitude},${destination.latitude}`)
    );

    // String of format {longitude},{latitude}
    // http://project-osrm.org/docs/v5.23.0/api/#general-options
    const apiUrl = `http://localhost:8080/routes?src=${sourceLongitude},${sourceLatitude}${destinaions}`;

    fetchData(apiUrl);
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

    // Empty the input fields
    setSourceLatitude("");
    setSourceLongitude("");
    setInputList([{ latitude: "", longitude: "" }]);

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

  // Set timeout to remove the error banner after 5 seconds
  if (fetchError) {
    setTimeout(() => {
      setFetchError("");
      console.log("Timeout: Remove the error");
    }, 5000);
  }

  return (
    <div>
      <h2>Enter the home geographical coordinates</h2>
      <form
        className={classesForm.root}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* if an error occur -> show alert message */}
        {fetchError && (
          <Alert severity="error">
            <AlertTitle>
              <strong style={{ fontSize: "1rem", textAlign: "center" }}>
                Error:
              </strong>
            </AlertTitle>
            {fetchError}
          </Alert>
        )}

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

        <hr />
        <h2>Enter the destination geographical coordinates</h2>

        {inputList &&
          inputList.map((destination, index) => {
            return (
              <div key={index * index}>
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
                <span>
                  {inputList.length !== 1 && (
                    <IconButton
                      style={{ color: "red" }}
                      aria-label="Remove destination"
                      onClick={() => handleRemoveClick(index)}
                    >
                      <DeleteForeverIcon fontSize="large" />
                    </IconButton>
                  )}

                  <br />

                  {inputList.length - 1 === index && (
                    <IconButton
                      color="primary"
                      aria-label="Add new destination"
                      onClick={handleAddClick}
                    >
                      <AddCircleIcon fontSize="large" />
                    </IconButton>
                  )}
                </span>
              </div>
            );
          })}
        <hr />

        <div>
          <br />
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </div>
      </form>

      <br />

      {/* if request is loading -> show spinner */}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          {data && data.routes && data.routes.length > 0 && (
            <Table className={classesTable.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nr</StyledTableCell>
                  <StyledTableCell colSpan={2} align="center">
                    Source <HomeIcon style={{ marginBottom: "-5px" }} />
                  </StyledTableCell>
                  <StyledTableCell colSpan={2} align="center">
                    Destination <FlagIcon style={{ marginBottom: "-5px" }} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Duration <TimerIcon style={{ marginBottom: "-5px" }} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Distance{" "}
                    <LocalShippingIcon style={{ marginBottom: "-5px" }} />
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.routes.map((row: IRoute, index: number) => (
                  <TableRow key={row.destination + index}>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell component="th" scope="row">
                      <b>Longitude:</b>
                      <br />
                      <b>Latitude:</b>
                    </TableCell>
                    <TableCell>
                      {data.source.split(",")[0]}
                      <br />
                      {data.source.split(",")[1]}
                    </TableCell>
                    <TableCell>
                      <b>Longitude:</b>
                      <br />
                      <b>Latitude:</b>
                    </TableCell>
                    <TableCell>
                      {row.destination.split(",")[0]}
                      <br />
                      {row.destination.split(",")[1]}
                    </TableCell>
                    <TableCell align="center">
                      {row.duration} seconds
                      <br />
                      {secondsToMinutes(row.duration)}
                    </TableCell>
                    <TableCell align="center">
                      {row.distance} meters
                      <br />
                      {metersToKm(row.distance)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
    </div>
  );
}
