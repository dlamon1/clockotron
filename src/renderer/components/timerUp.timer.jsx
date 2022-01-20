import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import IconButton from '@material-ui/core/IconButton';
import { StoreContext } from '../stores/store.context';

const TimeUp = observer((props) => {
  const { timer, clockotron } = useContext(StoreContext);

  let m = -8.7;

  let hUp = () => timer.setCurrentSeconds(timer.currentSeconds + 3600);
  let mUp = () => timer.setCurrentSeconds(timer.currentSeconds + 60);
  let sUp = () => timer.setCurrentSeconds(timer.currentSeconds + 1);

  useEffect(() => {
    window.electron.on('sUp', sUp);
    window.electron.on('mUp', mUp);
    window.electron.on('hUp', hUp);

    return () => {
      window.electron.all();
    };
  }, []);

  return (
    clockotron.tabValue === 0 && (
      <>
        <Grid item xs={12} style={{ marginTop: 0, marginBottom: -45 }}>
          <Grid container justifyContent="center" alignItems="center">
            {timer.formatPositions >= 3 && (
              <IconButton
                onClick={() =>
                  timer.setCurrentSeconds(timer.currentSeconds + 3600)
                }
                style={{
                  marginLeft: m,
                  marginRight: m,
                }}
              >
                <ArrowDropUpRoundedIcon
                  fontSize="large"
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
                  timer.setCurrentSeconds(timer.currentSeconds + 60)
                }
                style={{
                  marginLeft: m,
                  marginRight: m,
                }}
              >
                <ArrowDropUpRoundedIcon
                  fontSize="large"
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
                  timer.setCurrentSeconds(timer.currentSeconds + 1)
                }
                style={{
                  marginLeft: m,
                  marginRight: m,
                }}
              >
                <ArrowDropUpRoundedIcon
                  fontSize="large"
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

export default TimeUp;
