import * as React from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export default function BasicDateField(props) {
    const [locale, setLocale] = React.useState('es');
  const [value, setValue] = React.useState(dayjs(new Date(props.date)));

  const handleChangeDate = (date)=>{
    props.handleChange(date);
  }

  useEffect(() => {
    const newValue = dayjs(new Date(props.date));

    // Actualiza el valor del estado solo si ha cambiado
    if (!newValue.isSame(value)) {
      setValue(newValue);
    }

    // Llamada a la función de cambio solo cuando el valor de `value` cambia
    if (!newValue.isSame(props.date)) {
      props.handleChange(newValue);
    }
  }, [props.date, value, props.handleChange]);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <DateField
          label={props.label}
          value={value}
          onChange={(newValue) => handleChangeDate(newValue)}
        />
    </LocalizationProvider>
  );
}