import React, { useEffect, useState } from "react";
// const { ipcRenderer } = require('electron');
import { observer } from "mobx-react";

import { useGlobalStore } from "../utils/Store.jsx";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import SenderAccordian from "./SenderAccordian.jsx";

const Sender = observer((props) => {
  const gs = useGlobalStore();
  const { value } = props;

  return (
    <>
      {value === 0 && (
        <Grid item xs={12} style={{ marginTop: 25, backgroundColor: "" }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid
              item
              xs={12}
              style={{ marginTop: 0, maxWidth: "80%", backgroundColor: "" }}
            >
              <Grid container justifyContent="space-around" alignItems="center">
                <Button
                  style={{
                    padding: 20,
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor: "#353535",
                    color: "#A3CEF1",
                    fontSize: 18,
                    width: "100%",
                  }}
                  onClick={() => electron.vmix.setClockTime()}
                  variant="contained"
                >
                  Toggle clock window
                  <OpenInNewIcon style={{ paddingLeft: 15 }} />
                </Button>
                <SenderAccordian />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
});

export default Sender;
