import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useEffect, useState } from 'react';


export default function BasicDateEventPicker(props) {
  const [locale, setLocale] = React.useState('es');
  const [value, setValue] = React.useState(dayjs(new Date(props.date)));
  const [minValueDate, setMinValueDate] = useState(null);
  const [name, setName] = useState(props.name);

  useEffect(()=>{
    if(props.name==="end" && props.minDate!==null && props.minDate!==""){
      setMinValueDate(dayjs(new Date(props.minDate)))
    }
    console.log("sadas")
  },[props.name,  props.minDate])

  

  const handleChangeDate = (date)=>{
    props.handleChange(date,name);
  }

  useEffect(()=>{
    setName(props.name)
    console.log(props.name)
  }, [props.name])
  
  useEffect(() => {
    const newValue = dayjs(new Date(props.date));

    // Actualiza el valor del estado solo si ha cambiado
    if (!newValue.isSame(value)) {
      setValue(newValue);
    }

    // Llamada a la función de cambio solo cuando el valor de `value` cambia
    if (!newValue.isSame(props.date)) {
      props.handleChange(newValue, props.name);
    }
          console.log("sadas2")

  }, [props.date, props.name, value, props.handleChange]);



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DesktopDatePicker
        label={props.label}
        minDate={minValueDate}
        value={value}
         onChange={(newValue) => handleChangeDate(newValue)}
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