import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, redA400, white, lightBlack, black } from 'material-ui/styles/colors';
import AppBar from './AppBar';

require('../styles/App.scss');

const theme = getMuiTheme({
  palette: {
    primary1Color: green500,
    accent1Color: redA400,
    textColor: lightBlack
  },
  tabs: {
    backgroundColor: white,
    textColor: lightBlack,
    selectedTextColor: black
  },
  toolbar: {
    backgroundColor: white
  },
  inkBar: {
    backgroundColor: green500
  }
});

const AppContainer = (props) => {
  const currentRoute = props.routes[props.routes.length - 1];

  return (
    <MuiThemeProvider muiTheme={theme}>
      <div className="app">
        <AppBar
          showBackArrow={currentRoute.showBackArrow}
          title={currentRoute.title}
        />
        {props.children}
      </div>
    </MuiThemeProvider>
  );
};

export default AppContainer;
