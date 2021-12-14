import React, { useEffect, useState } from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';


const SenderAccordian = (props) => {

  const [size, setSize] = useState(40)
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)
  const [isCentered, setIsCentered] = useState(true)

  function changeSize(e, x) {
    // console.log(x)
    setSize(x)
    localStorage.setItem('size', x)
  }
  function changeX(e, x) {
    // console.log(x)
    setX(x)
    localStorage.setItem('xPos', x)
  }
  function changeY(e, x) {
    // console.log(x)
    setY(x)
    localStorage.setItem('yPos', x)
  }
  function centered() {
    let bool = isCentered
    setIsCentered(!bool)
    localStorage.setItem('isCentered', !bool)
    setX(50)
    localStorage.setItem('xPos', 50)
    setY(50)
    localStorage.setItem('yPos', 50)


    changeY(event, 50)
  }

  useEffect(() => {
    // setIsCentered(true)
    localStorage.setItem('isCentered', isCentered)
    // setSize(40)
    localStorage.setItem('size', 200)
    // setX(50)
    localStorage.setItem('xPos', 50)
    // setY(5)
    localStorage.setItem('yPos', 50)

  }, [])

  return (
    <Accordion style={{ backgroundColor: '#353535', width: '100%' }}  >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: 'white', }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ backgroundColor: '' }}
      >
        <Typography style={{ color: '#A3CEF1' }}>  SETTINGS</Typography>
      </AccordionSummary>
      <AccordionDetails >
        <Grid container style={{ backgroundColor: '' }}>

          <Paper style={{ backgroundColor: '#505050', marginTop: 5, padding: 8, paddingTop: 12, width: '100%' }}>
            <Grid item xs={12} style={{ marginTop: 0 }}>
              <Grid container justifyContent='space-around' alignItems='center'>
                <Typography color='primary'>
                  Size
                </Typography>
                <Slider
                  min={10}
                  max={500}
                  value={size}
                  onChange={changeSize}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default SenderAccordian