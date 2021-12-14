import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import parser from 'fast-xml-parser';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { useGlobalStore } from '../utils/Store.jsx';
import { options } from '../utils/options.jsx';

const TextInputList = observer((props) => {
  let { value, timerIndex } = props;

  const gs = useGlobalStore();

  const [inSelected, setInSelected] = useState('');
  const [textSelected, setTextSelected] = useState('');
  const [inputList, setInputList] = useState([]);
  const [textList, setTextList] = useState([]);

  const handleChange = (event) => {
    setTextSelected('');
    setInSelected(event.target.value);
    // gs.setInput(event.target.value);
    gs.timers[timerIndex].setInput(event.target.value);
    // gs.setText('');
    let selected = inputList.filter(
      (input) => input.attr.title == event.target.value
    );
    let arr = selected[0].text;
    let texts;
    switch (true) {
      case Array.isArray(arr):
        texts = [];
        arr.forEach((text) => texts.push(text.attr.name));
        setTextList(texts);
        break;
      case true:
        texts = arr.attr.name;
        let textsList = [];
        textsList.push(texts);
        setTextList(textsList);
        break;
      default:
        break;
    }
  };

  const handleTextChange = (event) => {
    setTextSelected(event.target.value);
    // gs.setText(event.target.value);
    gs.timers[timerIndex].setText(event.target.value);
  };

  async function setInputs() {
    let jsonObj = parser.parse(gs.xmlRaw, options);
    console.log(jsonObj);
    let list = jsonObj.vmix.inputs.input;

    let filtered = list.filter(
      (item) => item.attr.type === 'GT' || item.attr.type === 'Xaml'
    );
    setInputList(filtered);
  }

  useEffect(() => {
    gs.xmlRaw ? setInputs() : null;
    // setInputs();
    console.log('new xml text input');
  }, [gs.xmlRaw]);

  return (
    <>
      {/* {value === 0 && ( */}
      <>
        <Grid item xs={12} style={{ marginTop: 15 }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <FormControl style={{ width: '85%' }}>
              <InputLabel id="demo-simple-select-label">Input</InputLabel>
              <Select
                value={inSelected}
                style={{ width: '100%' }}
                onChange={handleChange}
              >
                {inputList.map((input, index) => (
                  <MenuItem value={input.attr.title} key={index}>
                    {input.attr.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: 15 }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <FormControl style={{ width: '85%' }}>
              <InputLabel id="demo-simple-select-label">Text Layer</InputLabel>
              <Select
                value={textSelected}
                style={{ width: '100%' }}
                onChange={handleTextChange}
              >
                {textList.map((text, index) => (
                  <MenuItem value={text} key={(text, index)}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </>
    </>
  );
});

export default TextInputList;
