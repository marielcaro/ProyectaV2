import * as React from 'react';
import dayjs from 'dayjs';
import { useEffect, useState, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';

export default function BasicTimePicker(props) {

    const [value, setValue] = useState(props.time);
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'};
    useEffect(()=>{
         props.handleChange((dayjs(value).format('YYYY-MM-DDTHH:mm:ss')) , props.name)
    },[value])


    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
          ampm={false}
          renderInput={(props) => <TextField  {...props} />}
          label={props.label}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          />
        
      </LocalizationProvider>

  );
}