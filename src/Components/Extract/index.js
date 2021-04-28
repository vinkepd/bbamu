import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import NotificationContext from "../../Providers/NotificationContext";
import {
  TYPE_ERROR,
  TYPE_SUCCESS,
} from "../../Providers/NotificationContextProvider";
import useApi from "../../API/useApi";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  cardAction: {
    justifyContent: "flex-end",
  },
}));

const Extract = () => {
  const classes = useStyles();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromDateError, setFromDateError] = useState(false);
  const [toDateError, setToDateError] = useState(false);
  const { openNotification } = useContext(NotificationContext);
  const { isLoading, callApi } = useApi();

  const handleExtract = async () => {
    try {
      await callApi({
        url: `/extract?fromDate=${fromDate.getTime()}&toDate=${toDate.getTime()}`,
      });
      openNotification({ type: TYPE_SUCCESS, message: "Successful!" });
    } catch (error) {
      openNotification({ type: TYPE_ERROR, message: error.message });
    }
  };

  const hasError = !fromDate || !toDate || fromDateError || toDateError;

  return (
    <Card>
      <CardHeader className={classes.cardHeader} title="Extract DTR" />
      <Divider></Divider>
      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              maxDate={toDate}
              margin="normal"
              label="From Date"
              format="MM/dd/yyyy"
              value={fromDate}
              onChange={(date) => setFromDate(date)}
              onError={(error) => setFromDateError(error)}
            />
            <KeyboardDatePicker
              minDate={fromDate}
              margin="normal"
              label="To Date"
              format="MM/dd/yyyy"
              value={toDate}
              onChange={(date) => setToDate(date)}
              onError={(error) => setToDateError(error)}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
      <CardActions className={classes.cardAction}>
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Button
            disabled={!!hasError}
            color="primary"
            variant="contained"
            onClick={handleExtract}
          >
            Extract
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Extract;
