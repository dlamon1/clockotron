import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from '../stores/store.context';

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
  const classes = useStyles();
  const { alertStore } = useContext(StoreContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setTimeout(alertStore.close(), 1500);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={alertStore.isOpen}
        autoHideDuration={alertStore.length}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alertStore.severity}>
          {alertStore.text}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default Toast;
