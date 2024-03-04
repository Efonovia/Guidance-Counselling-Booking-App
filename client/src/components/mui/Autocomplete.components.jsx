import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox(props) {
  return (
    <Autocomplete
      id="combo-box-demo"
      getOptionLabel={(option) => option.label}
      options={props.options}
      sx={
        { 
            width: props.width,
            marginBottom: "15px"
        }
       }
      value={props.value || null}
      onChange={(event, value) => props.handleChange(value)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      renderOption={(props, option) => (
        <li {...props}>
          <img src={option.pic} alt={option.label} style={{ marginRight: '8px', width: '60px', height: '60px' }} />
          {option.label}
        </li>
      )}
    />
  );
}
