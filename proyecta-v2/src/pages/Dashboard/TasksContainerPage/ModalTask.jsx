import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import './tasksContainerPage.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BasicDatePicker from '../../../components/DatePicker/DatePicker';
import BasicDateField from '../../../components/DateField/DateField';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
import { Modal } from 'bootstrap'; // Importa el módulo Modal de Bootstrap


const ModalTask = (props) => {
const allAllowedMembers = props.allAllowedMembers;
const [members, setMembers] = useState(props.taskData.members);
const [key, setKey] = useState(0); // Clave temporal
const [taskEndDate, setTaskEndDate]=useState(props.taskData.endDate);
const [readonly, setReadonly] = useState(true);
const [descriptionTask, setDescriptionTask] = useState(props.taskData.description)
const modalRef = useRef();


const handleDescritionChange = (event) => {
  setDescriptionTask(event.target.value)
}

const handleInputDateChange = (value) => {
  value = dayjs(value).toDate()
  setTaskEndDate(value)
}

const handleDeleteTask = () =>{
 
  props.handleDelete(props.taskId);
  // const modal = new window.bootstrap.Modal(modalRef.current); // Accede al objeto Modal de Bootstrap
  // modal.hide(); // Oculta el modal
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
          <>
              <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel"> {props.taskData.title}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-4">
                    <Stack spacing={4}  sx={{padding: '4px'}}>
                      <TextField id="projectName" label="Proyecto" variant="standard" value={props.taskData.projectName}/>
                      <BasicDateField label="Fecha de Finalización" date={taskEndDate} readOnly={readonly} handleChange={(value) => handleInputDateChange(value)}/>
                      <TextField id="taskDetail" multiline label="Descripción" variant="standard" value={descriptionTask} onChange={handleDescritionChange}  InputProps={{
                      readOnly: {readonly},
                    }}/>
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
                      <label className="lastUpdatedLabel"> * Última modificación realizada por: {props.taskData.lastUpdatedUser}, fecha: {props.taskData.lastUpdatedDate ? props.taskData.lastUpdatedDate.replace('T', ' ') : ""} </label>
                    </Stack>
                    </div>
                    <div className="modal-footer">
                      <button type="button" class="deleteBtn p-2 btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" ><DeleteIcon sx={{ color: grey[50] }}/> </button>
                    <div className='ms-auto p-2'>
                      <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" className="saveBtn btn btn-primary">Guardar Cambios</button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Delete Modal --> */}
          <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Eliminar Tarea</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Está por eliminar una tarea permanentamente. 
                  ¿Desea continuar?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-danger"   onClick={handleDeleteTask} data-bs-dismiss="modal">Confirmar</button>
                </div>
              </div>
            </div>
          </div>
          </>
    )
}

export default ModalTask;