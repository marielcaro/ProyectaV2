import React, { useEffect, useState, useRef } from 'react';
import './projectsContainerPage.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import ErrorToast from '../../../components/Toast/ErrorToast';

import { Button, Modal } from 'react-bootstrap';

const EditProjectModal = (props) => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

    const [show, setShow] = useState(props.show);
    const [project, setProject] = useState(props.project)
    const [title, setTitle] = useState(props.project.nombreProyecto)
    const [id, setId] = useState(props.projectId)
    const [description, setDescription] = useState( props.project.descripcion)
   
      
        const [allTags, setAllTags] = useState([]);
    const [tags, setTags] = useState( []);
    const handleTagsChange = (event, newTags) => {
        setTags(newTags);
      };
      
      const handleClose = () => props.handleHide();


    const handleTitleChange = (event) => {
        setTitle(event.target.value)
      }

  
      const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
      
      }


      const handleSaveChangesProject = () => {
            let obj = {
              id: id,
            nombreProyecto : title,
            descripcion : description,
            etiquetas:tags,
        }

        props.editInfo(id, obj)

        setTitle("");
        setDescription("");
        setTags([]);

        props.handleHide()
      }

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

      useEffect(()=>{
        setId(props.projectId)
      },[props.projectId])

      useEffect(()=>{
        setProject(props.project)
      },[props.project])

      useEffect(()=>{
        setTitle(project.nombreProyecto)
        setDescription(project.descripcion)
        setAllTags(project.etiquetas)

      },[project])
      
      useEffect(()=>{
        setShow(props.show)
      },[props.show])

      useEffect(()=>{
        fetchPalabrasClaves();
      },[])

return (
<Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Editar Información del Proyecto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
            <Stack spacing={4}  sx={{padding: '4px'}}>
            <TextField id="projectName" label="Nombre del Proyecto" variant="standard" value={title} onChange={handleTitleChange}/>
                      <TextField id="description" multiline label="Descripción" variant="standard" value={description} onChange={handleDescriptionChange}  />                 
                    
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
                  <Button variant="primary" onClick={handleSaveChangesProject}>
                    Guardar Cambios
                  </Button>
              </div>
            </Modal.Footer>
          </Modal>
)
}

export default EditProjectModal