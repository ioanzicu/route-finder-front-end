import React, { useState, useEffect } from "react";
import InputLocation from "./Input";
import { ICoordinates } from "../types/CustomTypes";
import LocationDataTable from "./LocationDataTable";

const SearchByLocation = () => {
  const [coordinatesData, setCoodinates] = useState<ICoordinates>({
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
  }, [coordinatesData]);

  //   const mockData = {
  //     longitude: "18.0081",
  //     latitude: "53.11931",
  //     locationLabel: "Bydgoszcz, Woj. Kujawsko-Pomorskie, Polska",
  //     country: "POL",
  //     state: "Woj. Kujawsko-Pomorskie",
  //     city: "Bydgoszcz",
  //     street: "Some Street",
  //     houseNumber: "23",
  //     postalCode: "85-023",
  //   };

  return (
    <div style={{ padding: "3rem", marginBottom: "2rem" }}>
      <InputLocation setCoodinates={setCoodinates} />
      {coordinatesData && (
        <LocationDataTable coordinatesData={coordinatesData} />
      )}
    </div>
  );
};

export default SearchByLocation;
