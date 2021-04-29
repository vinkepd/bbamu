import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Extract from "./Extract";
import Upload from "./Upload";
import NotificationContextProvider from "../Providers/NotificationContextProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: grey[900],
    height: "100vh",
    margin: "0 auto",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(6),
  },
}));

const Main = () => {
  const classes = useStyles();

  return (
    <NotificationContextProvider>
      <div className={classes.root}>
        <Container className={classes.main}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Upload />
            </Grid>
            <Grid item xs={6}>
              <Extract />
            </Grid>
          </Grid>
        </Container>
      </div>
    </NotificationContextProvider>
  );
};

export default Main;
