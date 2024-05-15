import * as React from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import './DatePicker.css';

export default function BasicDatePicker(props) {
  const [locale, setLocale] = useState('es');
  // const [value, setValue] = useState(dayjs(new Date(props.date)));
  const [value, setValue] = useState(props.date ? dayjs(props.date) : null); // Establecer el estado inicial solo si props.date está definido
  useEffect(() => {
    handleChange(value);
  }, [value]);

  useEffect(() => {
    const newValue = props.date ? dayjs(props.date) : null;

    // Actualiza el valor del estado solo si ha cambiado
// Actualiza el valor del estado solo si ha cambiado
if (!value || !newValue || !value.isSame(newValue)) {
  setValue(newValue);
  console.log("here")
}
  }, [props.date]);

  const handleChange = (newValue) => {
    if (newValue !== null) {
      setValue(newValue);
      props.changeHandler(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DesktopDatePicker
        label={props.label}
        value={value}
        onChange={(newValue) => {
          handleChange(newValue);
        }}

        renderInput={({ inputRef, inputProps, InputProps }) => (
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
             {InputProps?.endAdornment}
             <TextField fullWidth  ref={inputRef} {...inputProps}  id="date" label={props.label} variant="standard" 
             readOnly= {props.readOnly} 
             disabled = {props.readOnly} 
             />
               
          </Box>
        )}
        // open= {!props.readOnly} // Mantener cerrado el DatePicker
        disabled= {props.readOnly} // Deshabilitar el DatePicker
      />
    </LocalizationProvider>
  );
}