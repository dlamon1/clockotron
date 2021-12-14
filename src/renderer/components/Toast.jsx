import React from 'react';
import { observer } from 'mobx-react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import { useGlobalStore } from '../utils/Store';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(500),
    },
  },
}));

const Toast = observer(() => {
  const gs = useGlobalStore();
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setTimeout(gs.setToastOpen(false), 3000);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={gs.toastOpen}
        autoHideDuration={gs.toastLength}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={gs.severity}>
          {gs.alert}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default Toast;
