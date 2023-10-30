import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import './projectsContainerPage.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BasicDateField from '../../../components/DateField/DateField';
import defaultImage from '../../../assets/icons/default.png'
import { Button, Modal } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ErrorToast from '../../../components/Toast/ErrorToast';


const ModalAddProject = (props) => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    const [showModal, setShowModal] = useState(props.modalShow ?? false);
    const [title, setTitle] = useState("")
    const [taskStartDate, setTaskStartDate]=useState( "");
    const [description, setDescription] = useState( "");
    const [resolucion, setResolucion] = useState( "")
    const [faculty, setFaculty] = React.useState("select");
    const [facultadOptions, setFacultadOptions] = useState([]);
    const [department, setDepartment] = useState( "")
    const [allAllowedMembers, setAllAllowedMembers] = useState([]);
    const [members, setMembers] = useState( []);
    const [disabled, setDisabled] = useState(true)
    const handleMembersChange = (event, newMembers) => {
        setMembers(newMembers);
      };
    
      const [allAllowedLeaders, setAllAllowedLeaders] =useState([]);
      const [leaders, setLeaders] = useState([]);
      const handleLeadersChange = (event, newMembers) => {
        setLeaders(newMembers);
        };
      
    const [allTags, setAllTags] = useState([]);
    const [tags, setTags] = useState( []);
    const handleTagsChange = (event, newTags) => {
        setTags(newTags);
      };
      

    const handleClose = () => {
        props.handleCloseAdd()
    
        
    };
    const handleShow = () => props.handleShowAdd();

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
      }

      const handleInputDateChange = (value) => {
        value = dayjs(value).toDate()
        setTaskStartDate(value)
      }
      const handleDepartmentChange = (event) => {
        setDepartment(event.target.value)
      
      }

      const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
      
      }

      const handleResolucionChange = (event) => {
        setResolucion(event.target.value)
      
      }

      const handleFacultyChange = (event) => {
        setFaculty(event.target.value);
      };

      const handleCreateProject = () => {
        let allMembers= [];
        members.forEach((mem,index) => {
            let aux = {userId : mem.userId , label: mem.label}
            allMembers.push(aux)
        });

        let investigadores = [];
        members.forEach((m, index)=>{
          let add =  {...m};
          add['rol'] = "Investigador"
          investigadores.push(add);
        });

        let directores = [];
        leaders.forEach((m, index)=>{
          let add =  {...m};
          add['rol'] = "Director"
          directores.push(add);
        });

        let obj = {
            projectId : uuidv4(),
            projectName : title,
            startDate: taskStartDate.toISOString(),
            nroResolucion : resolucion,
            icon: defaultImage,
            description : description,
            departamento : department,
            facultad: faculty,

    tags:tags,
    tasks:{
        totalNumberOfTasks:0,
        numberOfCompletedTasks:0
    },
    members: investigadores,
    leaders:directores
        }

        props.handleAddProject(obj)

        setTitle("");
        setTaskStartDate("");
        setDescription("");
        setResolucion("");
        setFaculty("");
        setDepartment("");
        setMembers([]);
        setLeaders([]);
        setTags([]);
      }

      const fetchFacultadOptions = async () => {
        try {
         const token = localStorage.getItem('token');
       
          const response = await axios.get(`${apiEndpoint}/Facultad/GetAll`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setFacultadOptions(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
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

      const fetchPalabrasClaves = async () => {
        try {
         const token = localStorage.getItem('token');
       
          const response = await axios.get(`${apiEndpoint}/Etiqueta/ObtenerTodasEtiquetas`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setAllTags(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
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

      const fetchInvestigadores = async () => {
        try {
         const token = localStorage.getItem('token');
                 
          const response = await axios.get(`${apiEndpoint}/Perfil/GetInvestigadores`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setAllAllowedMembers(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
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

      const fetchDirectores = async () => {
        try {
         const token = localStorage.getItem('token');
                 
          const response = await axios.get(`${apiEndpoint}/Perfil/GetDirectores`, {
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          setAllAllowedLeaders(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
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

      useEffect(()=>{
        setShowModal(props.modalShow)
      },[props.modalShow])

      useEffect(()=>{
        if(taskStartDate && taskStartDate<= Date.now()&& title && description &&leaders.length>0 && tags.length>0 && members.length>0 && faculty && department){
          setDisabled(false)
        }else{
           setDisabled(true)
          }
    
      },[taskStartDate,title, description,leaders,tags,members,faculty,department])

      useEffect(() => {
        fetchFacultadOptions();
        fetchPalabrasClaves();
        fetchDirectores();
        fetchInvestigadores();
      }, []);

return (
<Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Alta de Nuevo Proyecto </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
            <Stack spacing={4}  sx={{padding: '4px'}}>
            <TextField id="projectName" label="Nombre del Proyecto" variant="standard" value={title} onChange={handleTitleChange}/>
            <TextField id="resolucion" multiline label="Nro. de Resolución" variant="standard" value={resolucion} onChange={handleResolucionChange}  />
                      <BasicDateField label="Fecha de Alta" date={taskStartDate} handleChange={(value) => handleInputDateChange(value)} disableFuture={true} />
                      <TextField id="description" multiline label="Descripción" variant="standard" value={description} onChange={handleDescriptionChange}  />
                   

                       <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Facultad</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={faculty}
                                          label="Facultad"
                                          onChange={handleFacultyChange}
                                        >
                                            <MenuItem value='select'>Elegir Facultad</MenuItem>
                                            {facultadOptions.map((option) => (
                                            <MenuItem key={option.id} value={option.nombreFacultad}>
                                              {option.nombreFacultad} {/* Asume que "nombre" es el nombre del grado. */}
                                            </MenuItem>
                                          ))}

                                        </Select>
                                      </FormControl> 
                    <TextField id="department" label="Departamento/Área" variant="standard" value={department} onChange={handleDepartmentChange}/>
                     
                      <Autocomplete
                              key={1}
                              multiple
                              id="leaders"
                              options={allAllowedLeaders}
                              getOptionLabel={(option) => option.nombreCompleto}
                              isOptionEqualToValue={(option, value) => option.nombreCompleto === value.nombreCompleto}
                              value={leaders} // Use the state variable as the value
                              onChange={handleLeadersChange} // Update the state on selection change
                              renderInput={(params) => (
                              <TextField
                                  {...params}
                                  variant="standard"
                                  label="Directores o Codirectores"
                                  placeholder="Añadir..."
                              />
                              )}
                />
                      <Autocomplete
                              key={2}
                              multiple
                              id="members"
                              options={allAllowedMembers}
                              getOptionLabel={(option) => option.nombreCompleto}
                              isOptionEqualToValue={(option, value) => option.nombreCompleto === value.nombreCompleto}
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
                         <Autocomplete
                              key={3}
                              multiple
                              id="tags"
                              options={allTags}
                              getOptionLabel={(option) => option.nombreEtiqueta}
                              isOptionEqualToValue={(option, value) => option.nombreEtiqueta === value.nombreEtiqueta}
                              value={tags} // Use the state variable as the value
                              onChange={handleTagsChange} // Update the state on selection change
                              renderInput={(params) => (
                              <TextField
                                  {...params}
                                  variant="standard"
                                  label="Palabras Claves"
                                  placeholder="Añadir..."
                              />
                              )}
                />
                     
                    </Stack>
            </Modal.Body>
            <Modal.Footer>
                <div className='ms-auto p-2'>
                  <Button variant="secondary" className="btn btn-secondary me-2" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary"  onClick={handleCreateProject} disabled={disabled}>
                    Crear Proyecto
                  </Button>
              </div>
            </Modal.Footer>
          </Modal>
)
}

export default ModalAddProject