import React, { useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const ColorPicker = ({ colorLabel, setColorLabel }) => {
  const colors = ['#2196f3', '#f44336', '#00c853', '#673ab7', '#ffc107']; // Define your colors

  const handleColorChange = (event) => {
    setColorLabel(event.target.value); // Update the colorLabel state on selection
  };

  return (
    <FormControl component="fieldset" sx={{ padding: '14px 15px'}}>
      <RadioGroup value={colorLabel} onChange={handleColorChange} sx={{display: 'inline'}}>
        {colors.map((color) => (
          <FormControlLabel
            key={color}
            value={color}
            control={<Radio style={{ color: color, '&$checked': { color: color } }} />} // Style the radio button with the color
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ColorPicker;
