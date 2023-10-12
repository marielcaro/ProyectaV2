import React, { useEffect, useState, useRef } from 'react';
import './changeProfile.css'
import Stack from '@mui/material/Stack';
import ImageUploader from '../../../components/imageUploader/imageUploader';

import { Button, Modal } from 'react-bootstrap';

import BasicDatePicker from '../../../components/DatePicker/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


import fullname from '../../../assets/icons/name.png'
import nrodni from '../../../assets/icons/nrodni.png'

import career from '../../../assets/icons/career.png'
import graduado from '../../../assets/icons/grado.png'
import subject from '../../../assets/icons/subject.png'
import university from '../../../assets/icons/university.png'


import {  useDispatch } from 'react-redux'


const ChangeProfileModal = (props) => {
    const [show, setShow] = useState(props.show);
    const dispatch = useDispatch()

    const [grado, setGrado] = React.useState('');
  
    const handleChange = (event) => {
      setGrado(event.target.value);
    };

    const handleSaveChanges = () => {
        props.handleHide()
    }

    const handleClose = () => props.handleHide();

    useEffect(()=>{
        setShow(props.show)
      },[props.show])

    return(
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Editar Información de Mi Perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row d-flex  my-3 justify-content-evenly">
            <div className="formColumn modalView col  col-12 col-sm-12 col-md-6  col-lg-6 col-xl-6">
            <Stack spacing={2}>
                            <div>
                                      <p style={{marginBottom:0}}>Subí una foto para tu perfil de usuario:</p>
                                    <ImageUploader />
                                    </div>
                                                                                                     
                                    
                            </Stack>
                          </div>
                          <div className="formColumn modalView col col-12 col-sm-12 col-md-6  col-lg-6 col-xl-6">
                          <Stack spacing={2}>
                                                         
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={subject} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard" label="Principal Área de Investigación" variant="standard" />

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={career} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard" label="Carrera Universitaria" variant="standard" />

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                
                                   
                                          <img className='icons' src={graduado} height="24" width="24" alt="Grado" />
                                          <div className='selectorContainer'>
                                          <FormControl variant="standard" sx={{ m: 1 , minWidth: '100%' }}>
                                      <InputLabel id="demo-simple-select-standard-label">Último grado alcanzado</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={grado}
                                        onChange={handleChange}
                                        label="Último grado alcanzado"
                                      >
                                        <MenuItem value="">
                                          <em>Último grado alcanzado</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Estudiante</MenuItem>
                                        <MenuItem value={20}>Grado Completo</MenuItem>
                                        <MenuItem value={30}>Pregrado Completo</MenuItem>
                                        <MenuItem value={30}>Posgrado Completo</MenuItem>
                                      </Select>
                                      </FormControl>
                                      </div>

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={university} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard" label="Universidad" variant="standard" />

                                    </Box>

                                    </Stack>
                            </div>
                            </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='ms-auto p-2'>
                  <Button variant="secondary" className="btn btn-secondary me-2" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={handleSaveChanges}>
                    Guardar Cambios
                  </Button>
              </div>
            </Modal.Footer>
          </Modal>
    )

}

export default ChangeProfileModal;