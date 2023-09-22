import React, { useEffect, useState, useRef } from 'react';
import './changeProfile.css'
import Stack from '@mui/material/Stack';

import { Button, Modal } from 'react-bootstrap';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import user from '../../../assets/icons/user.png'
import key from '../../../assets/icons/key.png'
import email from '../../../assets/icons/mail.png'
import repeat from '../../../assets/icons/repeat.png'

import {  useDispatch } from 'react-redux'


const ChangeUserInfoModal = (props) => {
    const [show, setShow] = useState(props.show);
    const dispatch = useDispatch()


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
              <Modal.Title> Editar Información de Mi Cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Stack spacing={2}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={email} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard" label="Correo electrónico" type="email" variant="standard" />

                                    </Box>

                                                                  
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={user} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard" label="Nombre de Usuario" variant="standard" />

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={key} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard" label="Contraseña" type="password" variant="standard" />

                                    </Box>

                                    
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={repeat} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard" label="Confirmar Contraseña"  type="password" variant="standard" />

                                    </Box>

                        
                                    </Stack>
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

export default ChangeUserInfoModal;