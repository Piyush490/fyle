import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SimpleSelect = (cities) => {
  const classes = useStyles();
  const [city, setCity] = React.useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (

<FormControl className = {classes.formControl} >
        <InputLabel id="demo-simple-select-label"> City </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          onChange={handleChange}
        >
          <MenuItem value={'all'}>All Cities</MenuItem>  
          <MenuItem value={'BANGLORE'}>Banglore</MenuItem>
          <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
          <MenuItem value={'Agra'}>Agra</MenuItem>
          <MenuItem value={'Lucknow'}>Lucknow</MenuItem>
          <MenuItem value={'DELHI'}>Delhi</MenuItem>

        </Select>
      </FormControl>
  )}

 export default SimpleSelect;