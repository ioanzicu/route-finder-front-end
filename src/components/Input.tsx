import React, { useState, useEffect, memo } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { FormControl } from "@material-ui/core";

import useInput from "../hoc/InputHook";
import { IGeocode } from "../types/CustomTypes";

const InputLocation = memo((_props: any) => {
  // get input data from the custom hook
  const { value, bind, reset } = useInput("");
  // fetch parameters: load, success, fail
  const [results, setResults] = useState<IGeocode>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");

  // HEREMAP Geocoder API for getting the geographical coordination by the name of the location
  const url: string = `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${process.env.REACT_APP_HEREMAP_GEOCODE_API}&searchtext=${value}`;

  const fetchData = async (url: string) => {
    try {
      // request data
      setLoading(true);
      const data = await fetch(url);
      const json = await data.json();
      // success
      if (json) {
        // no response
        if (json.Response.View.length === 0) {
          throw new Error("Unknown City / Vilage");
        }

        setLoading(false);
        setResults(json);
      }
    } catch (error) {
      // fail
      setLoading(false);
      setFetchError(error.message);
    }

    setLoading(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    // prevent page from refreshing
    event.preventDefault();

    if (value !== "") {
      // fetch
      fetchData(url);
    }

    // reset the input field
    reset();
  };

  // if there is a result set the coordinates wich will be passed to the parent component
  // because they are required for the Dashboard component

  useEffect(() => {
    if (
      results &&
      results.Response &&
      results.Response.View[0].Result[0].Location.DisplayPosition.Latitude &&
      results.Response.View[0].Result[0].Location.DisplayPosition.Longitude &&
      results.Response.View[0].Result[0].Location.Address.Label &&
      results.Response.View[0].Result[0].Location.Address.Country
    ) {
      _props.setCoodinates({
        longitude:
          results.Response.View[0].Result[0].Location.DisplayPosition.Longitude,
        latitude:
          results.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
        locationLabel:
          results.Response.View[0].Result[0].Location.Address.Label,
        country: results.Response.View[0].Result[0].Location.Address.Country,
        state: results.Response.View[0].Result[0].Location.Address.State,
        city: results.Response.View[0].Result[0].Location.Address.City,
        street: results.Response.View[0].Result[0].Location.Address.Street,
        houseNumber:
          results.Response.View[0].Result[0].Location.Address.HouseNumber,
        postalCode:
          results.Response.View[0].Result[0].Location.Address.PostalCode,
      });

      console.log("Result:", results);
    }
  });

  // if request is loading -> show spinner
  if (loading) return <CircularProgress />;

  // Remove error Alert after 5 seconds
  if (fetchError) {
    setTimeout(() => {
      setFetchError("");
      console.log("Timeout: Remove the error");
    }, 5000);
  }

  return (
    <FormControl>
      <form onSubmit={handleSubmit}>
       <div style={{ marginBottom: "2rem" }}>
       {fetchError && <Alert severity="error">
          <AlertTitle>
            <strong style={{ fontSize: "1rem", textAlign: "center" }}>
              Error:
            </strong></AlertTitle>
          Something went wrong: <strong>{fetchError}.</strong>
        </Alert>}
       </div>
        <TextField
          type="text"
          required
          helperText="Enter Name of the City/Vilage"
          {...bind}
        />
        <span style={{ padding: "15px" }}></span>
        <Button variant="contained" type="submit" color="primary">
          <LocationSearchingIcon style={{ paddingRight: "4px" }} />
          Search Location
        </Button>
      </form>
    </FormControl>
  );
});

export default InputLocation;
