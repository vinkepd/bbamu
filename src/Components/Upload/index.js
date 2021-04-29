import React, { useCallback, useContext, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import useApi from "../../API/useApi";
import NotificationContext from "../../Providers/NotificationContext";
import {
  TYPE_ERROR,
  TYPE_SUCCESS,
} from "../../Providers/NotificationContextProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    transition: "border .3s ease-in-out",
  },
  selectedFileContainer: {
    marginTop: theme.spacing(1),
    paddingLeft: 0,
    paddingRight: 0,
  },
  processContainer: {
    marginLeft: theme.spacing(2),
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

const Upload = () => {
  const classes = useStyles();
  const [file, setFile] = useState();
  const { isLoading, callApi } = useApi();
  const { openNotification } = useContext(NotificationContext);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: ".sql",
  });

  const handleProcess = async () => {
    const data = new FormData();
    data.append("file", file);
    try {
      const result = await callApi({
        url: "/upload",
        method: "POST",
        data: data,
      });
      console.log(`result`, result);
      openNotification({ type: TYPE_SUCCESS, message: result });
    } catch (error) {
      openNotification({ type: TYPE_ERROR, message: error.message });
    }
  };

  return (
    <Card>
      <CardHeader className={classes.cardHeader} title="Upload DTR" />
      <Divider />
      <CardContent>
        <div {...getRootProps({ className: classes.root })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop sql file here, or click to select file</p>
        </div>
        <Container className={classes.selectedFileContainer}>
          <Typography component="h4">
            <strong>Selected File</strong>
          </Typography>
          {file && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <ul>{file?.path}</ul>
              <div className={classes.processContainer}>
                {isLoading && <CircularProgress />}
                {!isLoading && (
                  <Button
                    className={classes.btnProcess}
                    variant="contained"
                    color="primary"
                    onClick={handleProcess}
                  >
                    Process
                  </Button>
                )}
              </div>
            </div>
          )}
        </Container>
      </CardContent>
    </Card>
  );
};

export default Upload;
