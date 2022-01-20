import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { GithubPicker } from 'react-color';

import { colors } from '../utils/ColorPickerColors';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

import { StoreContext } from '../stores/store.context';

const BaseColors = observer((props) => {
  const { videoReader, clockotron } = useContext(StoreContext);

  return (
    clockotron.tabValue === 1 && (
      <>
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <Accordion
              style={{ backgroundColor: videoReader.downColor, width: '85%' }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{ color: videoReader.downFontColor }}
                  />
                }
                style={{ backgroundColor: '' }}
              >
                <Typography
                  style={{ color: videoReader.downFontColor, fontWeight: 600 }}
                >
                  DOWN COLOR
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item xs={12} style={{ marginTop: -10 }}>
                  <Grid
                    container
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Paper
                      style={{
                        backgroundColor: '#252525',
                        padding: 8,
                        paddingTop: 12,
                        maxWidth: '95%',
                      }}
                    >
                      <Grid container style={{ minWidth: 250 }}>
                        <GithubPicker
                          onChangeComplete={(e) =>
                            videoReader.setDownColor(e.hex)
                          }
                          colors={colors}
                          triangle="hide"
                        />
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </>
    )
  );
});

export default BaseColors;
