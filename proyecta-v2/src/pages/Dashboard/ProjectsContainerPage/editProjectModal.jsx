import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import './projectsContainerPage.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BasicDateField from '../../../components/DateField/DateField';

import { Button, Modal } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EditProjectModal = (props) => {
    const [show, setShow] = useState(props.show);
    const [project, setProject] = useState(props.project)
    const [title, setTitle] = useState(props.project.projectName)
    const [id, setId] = useState(props.projectId)
    const [description, setDescription] = useState( props.project.description)
   
      
        const [allTags, setAllTags] = useState(props.project.tags);
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
        // let allMembers= [];
        // members.forEach((mem,index) => {
        //     let aux = {userId : mem.userId , label: mem.label}
        //     allMembers.push(aux)
        // });


        let obj = {
            projectName : title,
            description : description,
            // tags:tags,
        }

        props.editInfo(id, obj)

        setTitle("");
        setDescription("");
        // setTags([]);

        props.handleHide()
      }

      useEffect(()=>{
        setId(props.projectId)
      },[props.projectId])

      useEffect(()=>{
        setProject(props.project)
      },[props.project])

      useEffect(()=>{
        setTitle(project.projectName)
        setDescription(project.description)
        setAllTags(project.tags)

      },[project])
      
      useEffect(()=>{
        setShow(props.show)
      },[props.show])

return (
<Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Editar Información del Proyecto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
            <Stack spacing={4}  sx={{padding: '4px'}}>
            <TextField id="projectName" label="Nombre del Proyecto" variant="standard" value={title} onChange={handleTitleChange}/>
                      <TextField id="description" multiline label="Descripción" variant="standard" value={description} onChange={handleDescriptionChange}  />                 
                    
                         {/* <Autocomplete
                              key={3}
                              multiple
                              id="tags"
                              options={allTags}
                              getOptionLabel={(option) => option.label}
                              isOptionEqualToValue={(option, value) => option.label === value.label}
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
                /> */}
                     
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