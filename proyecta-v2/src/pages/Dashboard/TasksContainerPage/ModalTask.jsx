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
import { Button, Modal } from 'react-bootstrap';

const ModalTask = (props) => {
const allAllowedMembers = props.allAllowedMembers;
const [members, setMembers] = useState(props.taskData ? props.taskData.members : []);
const [key, setKey] = useState(0); // Clave temporal
const [taskEndDate, setTaskEndDate]=useState(props.taskData ? props.taskData.endDate: "");
const [readonly, setReadonly] = useState(false);
const [descriptionTask, setDescriptionTask] = useState(props.taskData ? props.taskData.description : "")
const [titleTask, setTitleTask] = useState(props.taskData ? props.taskData.title : "")
const [showDeleteModal, setShowDeleteModal] = useState(false);

const handleCloseDeleteModal = () => {
  setShowDeleteModal(false);
}
const handleShowDeleteModal = () => setShowDeleteModal(true);

const handleDeleteClick = () => {
  handleShowDeleteModal()

}

const handleDescritionChange = (event) => {
  setDescriptionTask(event.target.value)

}

const handleTitleChange = (event) => {
  setTitleTask(event.target.value)
}

const handleInputDateChange = (value) => {
  value = dayjs(value).toDate()
  setTaskEndDate(value)
}

const handleHideEditModal = () => {
  props.handleClose()
}

const handleSaveEditModal = () => {
  if(props.action === "edit"){
      let task = props.taskData;
      task.members = members;
      task.endDate = taskEndDate;
      task.description = descriptionTask;
        props.handleSave(props.taskId,task);
        props.handleClose()
  }else{
    if(props.action === "new"){
      let newTask = props.taskData;
      newTask.title = titleTask;
      newTask.members = members;
      newTask.endDate = taskEndDate;
      newTask.description = descriptionTask;
        props.handleSaveNew(newTask);
        props.handleClose()
    }
  }
}

const handleDeleteTask = () =>{
  handleHideEditModal()
  handleCloseDeleteModal()
  props.handleDelete(props.taskId);
  
}

const handleMembersChange = (event, newMembers) => {
  setMembers(newMembers);
};

// useEffect(()=>{

//   console.log("taskEndDate")
//   console.log(taskEndDate)

// },[taskEndDate])

useEffect(()=>{
  if (props.taskData){
    setMembers(props.taskData.members)
    setKey(key + 1); // Actualizar la clave temporal
    // console.log("date")
    console.log(props.taskData)
    setDescriptionTask(props.taskData.description)
    setTitleTask(props.taskData.title)
    setTaskEndDate(props.taskData.endDate)

  }
 
},[props.taskData])


// useEffect( ()=>{
//   console.log("asd")
 
// },[descriptionTask])


    return (
          <>
             <Modal show={props.modalEditState} onHide={handleHideEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>{props.action ==="edit" ? props.taskData.title :   <TextField id="title" label="Título" variant="standard" value={titleTask}  onChange={handleTitleChange}/> }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Stack spacing={4}  sx={{padding: '4px'}}>
                      <TextField id="projectName" label="Proyecto" variant="standard" value={props.taskData ? props.taskData.projectName : ""}/>
                      <BasicDateField label="Fecha de Finalización" date={taskEndDate} readOnly={readonly} handleChange={(value) => handleInputDateChange(value)}/>
                      <TextField id="taskDetail" multiline label="Descripción" variant="standard" value={descriptionTask} onChange={handleDescritionChange}  InputProps={{
                       readOnly: readonly
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
                      <TextField id="taskAuthor" label="Creador" value={props.taskData ? props.taskData.author : ""} variant="standard"></TextField>
                      <label className="lastUpdatedLabel"> { props.action === "edit" ? "* Última modificación realizada por: "+  props.taskData.lastUpdatedUser + ", fecha: "+props.taskData.lastUpdatedDate.replace('T', ' ')  : ""}</label>
                    </Stack>
            </Modal.Body>
            <Modal.Footer>
              {props.action==="edit"? <Button className="deleteBtn p-2 "  variant="danger" onClick={handleDeleteClick}>
                   <DeleteIcon sx={{ color: grey[50] }}/>
              </Button> : <></>}
              <div className='ms-auto p-2'>
                  <Button variant="secondary" className="btn btn-secondary me-2" onClick={handleHideEditModal}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={handleSaveEditModal}>
                    {props.action==="edit" ? "Guardar Cambios" : "Crear Tarea"}
                  </Button>
              </div>
            </Modal.Footer>
          </Modal>
             

              {/* <!-- Delete Modal --> */}
              <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Eliminar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Está por eliminar una tarea permanentamente. 
                  ¿Desea continuar?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDeleteModal}>
                    Cerrar
                  </Button>
                  <Button variant="danger" onClick={handleDeleteTask}>
                    Confirmar
                  </Button>
                </Modal.Footer>
              </Modal>
         
        
          </>
    )
}

export default ModalTask;