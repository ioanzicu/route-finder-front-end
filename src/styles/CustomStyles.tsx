import TableCell from "@material-ui/core/TableCell";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

export const useFormStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
    },
  },
}));

export const useTableStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: "1rem",
      fontWeight: "bold",
    },
  })
)(TableCell);
