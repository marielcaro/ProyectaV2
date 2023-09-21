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

const ModalAddProject = (props) => {
    const [showModal, setShowModal] = useState(props.modalShow ?? false);
    const [title, setTitle] = useState("")
    const [taskStartDate, setTaskStartDate]=useState( "");
    const [description, setDescription] = useState( "")
    const [faculty, setFaculty] = React.useState("select");
    const [department, setDepartment] = useState( "")
    const allAllowedMembers = props.allAllowedMembers;
    const [members, setMembers] = useState( []);
    const [disabled, setDisabled] = useState(true)
    const handleMembersChange = (event, newMembers) => {
        setMembers(newMembers);
      };
    
      const allAllowedLeaders = props.allAllowedLeaders;
      const [leaders, setLeaders] = useState([]);
      const handleLeadersChange = (event, newMembers) => {
        setLeaders(newMembers);
        };
      
        const allTags = props.allTags;
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
      const handleFacultyChange = (event) => {
        setFaculty(event.target.value);
      };

      const handleCreateProject = () => {
        let allMembers= [];
        members.forEach((mem,index) => {
            let aux = {userId : mem.userId , label: mem.label}
            allMembers.push(aux)
        });


        let obj = {
            projectId : uuidv4(),
            projectName : title,
            startDate: taskStartDate.toISOString(),
            icon: defaultImage,
            description : description,
    tags:tags,
    tasks:{
        totalNumberOfTasks:0,
        numberOfCompletedTasks:0
    },
    allProjectMembers: allMembers
        }

        props.handleAddProject(obj)

        setTitle("");
        setTaskStartDate("");
        setDescription("");
        setFaculty("");
        setDepartment("");
        setMembers([]);
        setLeaders([]);
        setTags([]);
      }

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

return (
<Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Alta de Nuevo Proyecto </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
            <Stack spacing={4}  sx={{padding: '4px'}}>
            <TextField id="projectName" label="Nombre del Proyecto" variant="standard" value={title} onChange={handleTitleChange}/>
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
                                          <MenuItem value='fceyt'>Facultad de Ciencias Exactas y Tecnologías</MenuItem>
                                          <MenuItem value='faya'>Facultad de Agronomía y Agroindustrias</MenuItem>
                                          <MenuItem value='fcm'>Facultad de Ciencias Médicas</MenuItem>
                                          <MenuItem value='fcf'>Facultad de Ciencias Forestales</MenuItem>
                                          <MenuItem value='fhcsys'>Facultad de Humanidades, Ciencias Sociales y Ciencias de la Salud</MenuItem>

                                        </Select>
                                      </FormControl> 
                    <TextField id="department" label="Departamento/Área" variant="standard" value={department} onChange={handleDepartmentChange}/>
                     
                      <Autocomplete
                              key={1}
                              multiple
                              id="leaders"
                              options={allAllowedLeaders}
                              getOptionLabel={(option) => option.label}
                              isOptionEqualToValue={(option, value) => option.label === value.label}
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
                         <Autocomplete
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