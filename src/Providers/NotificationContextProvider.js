import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import NotificationContext from "./NotificationContext";

export const TYPE_SUCCESS = "success";
export const TYPE_ERROR = "error";

const NotificationContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [notificationType, setNotificationType] = useState();
  const [message, setMessage] = useState();

  const openNotification = ({ type, message }) => {
    if (!type || !message) return;

    setOpen(true);
    setNotificationType(type);
    setMessage(message);
  };

  const handleClose = (_, reason) => {
    if (reason !== "clickaway") {
      setOpen(false);
      setNotificationType();
      setMessage();
    }
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {open ? (
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={notificationType}
          >
            {message}
          </Alert>
        ) : null}
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
