import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './tasksContainerPage.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BasicDatePicker from '../../../components/DatePicker/DatePicker';
import BasicDateField from '../../../components/DateField/DateField';

const ModalTask = (props) => {
const allAllowedMembers = props.allAllowedMembers;
const [members, setMembers] = useState(props.taskData.members);
const [key, setKey] = useState(0); // Clave temporal
const [taskEndDate, setTaskEndDate]=useState(props.taskData.endDate);



const handleInputDateChange = (value) => {
  value = dayjs(value).toDate()
  setTaskEndDate(value)
}



const handleMembersChange = (event, newMembers) => {
  setMembers(newMembers);
};

useEffect(()=>{

  console.log("taskEndDate")
  console.log(taskEndDate)

},[taskEndDate])

useEffect(()=>{
  setMembers(props.taskData.members)
  setKey(key + 1); // Actualizar la clave temporal
  console.log("date")
  // console.log(props.taskData.endDate)
  setTaskEndDate(props.taskData.endDate)
},[props.taskData])


useEffect( ()=>{
  console.log(props.taskId)
 
},[props.taskId])


    return (

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel"> "{props.taskData.title}"</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body px-4">
          <Stack spacing={4}  sx={{padding: '4px'}}>
             <TextField id="projectName" label="Proyecto" variant="standard" value={props.taskData.projectName}/>
             <BasicDateField label="Fecha de Finalización" date={taskEndDate} readOnly={true} handleChange={(value) => handleInputDateChange(value)}/>
             <TextField id="taskDetail" multiline label="Descripción" variant="standard" value={props.taskData.description}/>
             <Autocomplete
                    key={key}
                    multiple
                    id="tags-standard"
                    options={allAllowedMembers}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    value={members} // Use the state variable as the value
                    onChange={handleMembersChange} // Update the state on selection change
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Integrantes"
                        placeholder="Añadir..."
                    />
                    )}
      />
             <TextField id="taskAuthor" label="Creador" value={props.taskData.author} variant="standard"></TextField>
          </Stack>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-primary">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
   
    )
}

export default ModalTask;