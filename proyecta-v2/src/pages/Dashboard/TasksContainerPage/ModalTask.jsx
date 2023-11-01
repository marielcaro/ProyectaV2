import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import './tasksContainerPage.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BasicDateField from '../../../components/DateField/DateField';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
import { Button, Modal } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import ErrorToast from '../../../components/Toast/ErrorToast';

const ModalTask = (props) => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const [allAllowedMembers, setAllowedMembers] = useState([]);
const [members, setMembers] = useState( []);
const [key, setKey] = useState(0); // Clave temporal
const [taskEndDate, setTaskEndDate]=useState("");
const [readonly, setReadonly] = useState(false);
const [descriptionTask, setDescriptionTask] = useState("")
const [titleTask, setTitleTask] = useState( "")
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [status, setStatus] = React.useState(props.taskData ? props.taskData.estado : "new");

const handleChange = (event) => {
  setStatus(event.target.value);
};


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
      task.tareaId = props.taskId
      task.listaIntegrantes = members;
      task.fechaFin = taskEndDate;
      task.descripcion = descriptionTask;
      task.estado = status;
        props.handleSave(props.taskId,task);
        props.handleClose()
  }else{
    if(props.action === "new"){
      let newTask = props.taskData;
      newTask.nombreTarea = titleTask;
      newTask.listaIntegrantes = members;
      newTask.fechaFin = taskEndDate;
      newTask.descripcion = descriptionTask;
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


useEffect(()=>{
  if (props.taskData){
    if(props.action==="edit"){
      const integrantes = fetchAllAllowedMembers();
      setAllowedMembers(integrantes)
    }else{
      setAllowedMembers(props.allAllowedMembers ? props.allAllowedMembers : [])

    }
    setMembers(props.taskData.listaIntegrantes)
    setKey(key + 1); // Actualizar la clave temporal
    console.log(props.taskData)
    setDescriptionTask(props.taskData.descripcion)
    setTitleTask(props.taskData.nombreTarea)
    setTaskEndDate(props.taskData.fechaFin)
    setStatus(props.taskData.estado)
    


  }
 
},[props.taskData])

const fetchAllAllowedMembers = async () => {
  try {
    const token = localStorage.getItem('token');

    // Obtiene el userName almacenado en localStorage
  const proyectId = props.taskData.proyectoGuid;

    const response = await axios.get(`${apiEndpoint}/Integrante/IntegrantesPorProyecto/${proyectId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
      },
    });
    setAllowedMembers(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
  } catch (error) {
    if(error.response.status === 401)
    {
      ErrorToast("Acceso no Autorizado")
    }else{
      if(error.response.status === 400){
        ErrorToast("Error en la solicitud, verifique los datos ingresados")
      }else if(error.response.status === 404){
        ErrorToast("Error interno, Datos no encontrados")
      }else if(error.response.status === 500){
        ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
      }
    } 
  }
};


    return (
          <>
             <Modal show={props.modalEditState} onHide={handleHideEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>{props.action ==="edit" ? titleTask :   (<TextField id="nombreTarea" label="Título" variant="standard" value={titleTask}  onChange={handleTitleChange}/>) }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Stack spacing={4}  sx={{padding: '4px'}}>
                      {props.mobile === true ?    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Cambiar de estado</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={status}
                                          label="Cambiar de estado"
                                          onChange={handleChange}
                                        >
                                          <MenuItem value='new'>Nueva</MenuItem>
                                          <MenuItem value='inProgress'>En Progreso</MenuItem>
                                          <MenuItem value='resolved'>Resuelta</MenuItem>
                                          <MenuItem value='ended'>Finalizada</MenuItem>

                                        </Select>
                                      </FormControl> : <></>}
                      <TextField id="nombreProyecto" label="Proyecto" variant="standard" value={props.taskData ? props.taskData.nombreProyecto : ""}/>
                      <BasicDateField label="Fecha de Finalización" date={taskEndDate} readOnly={readonly} handleChange={(value) => handleInputDateChange(value)}/>
                      <TextField id="descripcion" multiline label="Descripción" variant="standard" value={descriptionTask} onChange={handleDescritionChange}  InputProps={{
                       readOnly: readonly
                    }}/>
                      <Autocomplete
                              key={key}
                              multiple
                              id="tags-standard"
                              options={allAllowedMembers}
                              getOptionLabel={(option) => option.nombreCompleto}
                              isOptionEqualToValue={(option, value) => option.nombreCompleto === value.nombreCompleto}
                              value={members} // Use the state variable as the value
                              onChange={handleMembersChange} // Update the state on selection change
                              renderInput={(params) => (
                              <TextField
                              variant="standard"
                              label="Integrantes"
                              placeholder="Añadir..."
                                  {...params}
                                 

                              />
                              )}
                />
                      <TextField id="taskAuthor" label="Creador" value={props.taskData ? props.taskData.autor : ""} variant="standard"></TextField>
                      <label className="lastUpdatedLabel"> { props.action === "edit" && props.taskData? "* Última modificación el día: " + props.taskData.fechaUltimaActualizacion.replace('T', ' ')  : ""}</label>
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