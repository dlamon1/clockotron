import React from 'react';

import Box from '@material-ui/core/Box';

const InputList = (props) => {
  let { input } = props;

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={getInputs}
          style={{ backgroundColor: '' }}
        >
          Get Input
        </Button>
        <Box>
          {inputs.map((input) => (
            <InputCard input={input} key={input.key} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default InputList;
