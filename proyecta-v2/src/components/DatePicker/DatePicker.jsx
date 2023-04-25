import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import './DatePicker.css';

export default function BasicDatePicker(props) {
  const [locale, setLocale] = React.useState('es');
  const [value, setValue] = React.useState(dayjs(''));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DesktopDatePicker
        label={props.label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
             {InputProps?.endAdornment}
             <TextField fullWidth  ref={inputRef} {...inputProps}  id="date" label={props.label} variant="standard" />
    
           
          </Box>
        )}
      />
    </LocalizationProvider>
  );
}