import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#fefe'
    },
    text: {
      primary: '#ffffff',
      secondary: '#fff',
      disabled: '#fff',
      hint: '#fff'
    },
    background: {
      paper: '#12050E'
    },
    action: {
      disabledBackground: '#FFF'
    }
  }
});
