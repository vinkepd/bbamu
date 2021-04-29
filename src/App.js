import React, { Component } from "react";
import "./App.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import ErrorPage from "./Components/ErrorPage";
import Main from "./Components/Main";
import { blue, orange } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: orange[800],
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        {error ? <ErrorPage error={error} /> : <Main />}
      </MuiThemeProvider>
    );
  }
}

export default App;
