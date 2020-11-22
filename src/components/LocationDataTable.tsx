import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { StyledTableCell } from "../styles/CustomStyles";
import { ICoordinates } from "../types/CustomTypes";

const useTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "2rem",
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

type ILocationDataTable = {
  coordinatesData: ICoordinates;
};

const LocationDataTable = ({ coordinatesData }: ILocationDataTable) => {
  const classesTable = useTableStyles();

  return (
    <span>
      {coordinatesData && (
        <TableContainer component={Paper}>
          <Table className={classesTable.root}>
            <TableHead>
              <TableRow>
                {coordinatesData.locationLabel ? (
                  <StyledTableCell align="center" colSpan={2}>
                    <h2>{coordinatesData.locationLabel}</h2>
                  </StyledTableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {coordinatesData.longitude ? (
                <TableRow>
                  <TableCell>Longitude:</TableCell>
                  <TableCell>{coordinatesData.longitude}</TableCell>
                </TableRow>
              ) : null}
              {coordinatesData.latitude ? (
                <TableRow>
                  <TableCell>Latitude:</TableCell>
                  <TableCell>{coordinatesData.latitude}</TableCell>
                </TableRow>
              ) : null}
              {coordinatesData.country ? (
                <TableRow>
                  <TableCell>Country:</TableCell>
                  <TableCell>{coordinatesData.country}</TableCell>
                </TableRow>
              ) : null}
              {coordinatesData.state ? (
                <TableRow>
                  <TableCell>State:</TableCell>
                  <TableCell>{coordinatesData.state}</TableCell>
                </TableRow>
              ) : null}
              {coordinatesData.city ? (
                <TableRow>
                  <TableCell>City:</TableCell>
                  <TableCell>{coordinatesData.city}</TableCell>
                </TableRow>
              ) : null}
              {coordinatesData.street ? (
                <TableRow>
                  <TableCell>Street:</TableCell>
                  <TableCell>{coordinatesData.street}</TableCell>
                </TableRow>
              ) : null}
              {coordinatesData.houseNumber ? (
                <TableRow>
                  <TableCell>House Number:</TableCell>
                  <TableCell>{coordinatesData.houseNumber}</TableCell>
                </TableRow>
              ) : null}
              {coordinatesData.postalCode ? (
                <TableRow>
                  <TableCell>Postal Code:</TableCell>
                  <TableCell>{coordinatesData.postalCode}</TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </span>
  );
};

export default LocationDataTable;
