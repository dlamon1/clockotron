import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { StoreContext } from '../stores/store.context';

const TimeDown = observer((props) => {
  const { timer, clockotron } = useContext(StoreContext);

  let m = -8.7;

  let hDown = () =>
    3600 <= parseInt(timer.currentSeconds) &&
    timer.setCurrentSeconds(timer.currentSeconds - 3600);
  let mDown = () =>
    timer.currentSeconds > 61 &&
    timer.setCurrentSeconds(timer.currentSeconds - 60);
  let sDown = () =>
    timer.currentSeconds > 0 &&
    timer.setCurrentSeconds(timer.currentSeconds - 1);

  useEffect(() => {
    window.electron.on('sDown', sDown);
    window.electron.on('mDown', mDown);
    window.electron.on('hDown', hDown);

    return () => {
      window.electron.all();
    };
  }, []);

  return (
    clockotron.tabValue === 0 && (
      <>
        <Grid item xs={12} style={{ marginTop: -45, marginBottom: 0 }}>
          <Grid container justifyContent="center" alignItems="center">
            {timer.formatPositions >= 3 && (
              <IconButton
                onClick={() =>
                  timer.setCurrentSeconds(timer.currentSeconds - 3600)
                }
                disabled={3600 >= parseInt(timer.currentSeconds)}
                style={{
                  marginLeft: m,
                  marginRight: m,
                }}
              >
                <ArrowDropDownRoundedIcon
                  style={{
                    marginLeft: m,
                    marginRight: m,
                    fontSize: 75,
                    color: 'lightgrey',
                  }}
                />
              </IconButton>
            )}
            {timer.formatPositions >= 2 && (
              <IconButton
                onClick={() =>
                  timer.setCurrentSeconds(timer.currentSeconds - 60)
                }
                disabled={timer.currentSeconds < 61}
                style={{
                  marginLeft: m,
                  marginRight: m,
                }}
              >
                <ArrowDropDownRoundedIcon
                  style={{
                    marginLeft: m,
                    marginRight: m,
                    fontSize: 75,
                    color: 'lightgrey',
                  }}
                />
              </IconButton>
            )}
            {timer.formatPositions >= 1 && (
              <IconButton
                onClick={() =>
                  timer.setCurrentSeconds(timer.currentSeconds - 1)
                }
                disabled={timer.currentSeconds <= 0}
                style={{
                  marginLeft: m,
                  marginRight: m,
                }}
              >
                <ArrowDropDownRoundedIcon
                  style={{
                    marginLeft: m,
                    marginRight: m,
                    fontSize: 75,
                    color: 'lightgrey',
                  }}
                />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </>
    )
  );
});

export default TimeDown;
