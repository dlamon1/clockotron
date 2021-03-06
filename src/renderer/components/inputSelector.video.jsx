import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { StoreContext } from '../stores/store.context';

const TextInputList = observer((props) => {
  const { i } = props;
  const { vmix, videoReader, clockotron } = useContext(StoreContext);

  const [inSelected, setInSelected] = useState('');
  const [textSelected, setTextSelected] = useState('');
  const [inputList, setInputList] = useState([]);
  const [textList, setTextList] = useState([]);

  const handleChange = (event) => {
    setTextSelected('');
    setInSelected(event.target.value);
    videoReader.setInput(event.target.value);
    let selected = inputList.filter(
      (input) => input.title == event.target.value
    );
    let arr = selected[0].text;
    let texts;
    switch (true) {
      case Array.isArray(arr):
        texts = [];
        arr.forEach((text) => texts.push(text.name));
        setTextList(texts);
        break;
      case true:
        texts = arr.name;
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
    videoReader.setText(event.target.value);
  };

  const setInputs = () => {
    let list = vmix.inputs;
    let filtered = list.filter(
      (item) => item.type === 'GT' || item.type === 'Xaml'
    );
    setInputList(filtered);
  };

  useEffect(() => {
    vmix.inputs && setInputs();
  }, [vmix.inputs]);

  return (
    clockotron.tabValue === 1 && (
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
                  <MenuItem value={input.title} key={index}>
                    {input.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: 10 }}>
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
    )
  );
});

export default TextInputList;
