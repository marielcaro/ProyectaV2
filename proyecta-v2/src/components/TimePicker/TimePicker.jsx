import * as React from 'react';
import dayjs from 'dayjs';
import { useEffect, useState, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';

export default function BasicTimePicker() {

    const [value, setValue] = useState(null);

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Selecciona una hora"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          />
        
      </LocalizationProvider>

  );
}