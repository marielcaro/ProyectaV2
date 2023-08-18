import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useEffect, useState, useRef } from 'react';
import { SevenKSharp } from '@mui/icons-material';


export default function BasicDateEventPicker(props) {
  const [locale, setLocale] = React.useState('es');
  const [value, setValue] = React.useState(props.date);
  const [minValueDate, setMinValueDate] = useState(null);

  useEffect(()=>{
    if(props.name==="end" && props.minDate!==null && props.minDate!==""){
      setMinValueDate(dayjs(new Date(props.minDate)))
    }
  },[props.name, value, props.minDate])

  useEffect(()=>{
    
        if(props.date === null || props.date==='Invalid Date'){
            setValue(null)
          }else{
            setValue(props.date)
    }         

},[props.date])

useEffect(() => {
    if (value !== props.date) {
        props.handleChange(value, props.name);
      }
  }, [value,  props.name]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DesktopDatePicker
        label={props.label}
        minDate={minValueDate}
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