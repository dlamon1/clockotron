import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core';

import App from './App.jsx';
import { StoreProvider } from './utils/Store.jsx';
import { theme } from './utils/Theme.jsx';

ReactDOM.render(
  <StoreProvider>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
);
