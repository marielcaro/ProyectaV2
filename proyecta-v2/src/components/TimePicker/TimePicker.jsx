import * as React from 'react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';

export default function BasicTimePicker(props) {

  
    const [value, setValue] = useState(null);
    const [minValueTime, setMinValueTime] = useState(null);
    const [errorView, setErrorView] = useState(props.error);

    useEffect(()=>{
      if(props.name==="endTime" && props.minTime!==null && props.minTime!==""){
        setMinValueTime(dayjs(new Date("08/08/2008 "+ props.minTime)))
      }
      console.log("sadas")
    },[props.name, value, props.minTime])

    useEffect(()=>{
   
      if(props.action === "selectedEvent"){
            if(props.time === null || props.time==='Invalid Date'){
              setValue(null)
            }else{
              setValue(dayjs(new Date("08/08/2008 "+ props.time)))
            }
      }else{
      
            if(props.time === null || props.time==='Invalid Date'){
              setValue(null)
            }
        
      }
  
 },[props.time, props.action])

    useEffect(()=>{
       
         props.handleChange((value) , props.name)
         if (!value) {
          setErrorView(true);
        } else {
          setErrorView(false);
        }
      
     
    },[value])



    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <TimePicker
 
          renderInput={(props) => <TextField {...props } error={errorView} />}                      
          ampm={false}
          label={props.label}
          minTime={minValueTime}
          value={value}
          onChange={(newValue) => setValue(newValue)}
     
          />
        
      </LocalizationProvider>

  );
}