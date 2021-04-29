import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: grey[800],
    height: "100vh",
    paddingTop: "100px",
    fontFamily: "Roboto",
  },
  errorBox: {
    width: "fit-content",
    maxWidth: "600px",
    margin: "0 auto",
  },
  errorHeader: {
    marginBottom: "10px",
  },
});

const ErrorPage = ({ error }) => {
  const classes = useStyles();

  const message =
    error === "Request failed with status code 403"
      ? "It looks like you don't have access to this page."
      : "We're working hard to fix the problem. Please try again later!";

  const goBack = () => {
    // window.location = ''
  };

  return (
    <div className={classes.root}>
      <Card className={classes.errorBox}>
        <CardContent>
          <Typography variant="h5" className={classes.errorHeader}>
            Whoops, something went wrong.
          </Typography>
          <Typography variant="p" color="textSecondary">
            {message}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={goBack}>
            Go Back
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ErrorPage;
