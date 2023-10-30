import React, { useEffect, useState, useRef } from 'react';
import './changeProfile.css'
import Stack from '@mui/material/Stack';
import axios from 'axios';
import ErrorToast from '../../../components/Toast/ErrorToast';

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
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    const dispatch = useDispatch()
    const [repeatedPass, setRepeatedPass] =useState("");

    const [formData, setFormData] = useState({
      userId: "",
      userName: "",
      userEmail: "",
      password: ""
    });

    const handleChangeRepeatPass = (e) => {
      setRepeatedPass(e.currentTarget.value);
    }

    const handleSaveChanges = () => {
        props.handleHide()
    }

    const handleInputChange = (e) => {
      const { id, value } = e.currentTarget;
      setFormData({
        ...formData,
        [id]: value,
      });
    };

    const handleClose = () => props.handleHide();

    const clickSaveForm = async () => {
      if ( formData.userEmail && formData.userName && formData.password && (formData.password === repeatedPass)){
        const perfilId =localStorage.getItem('perfilId');
        const userId =localStorage.getItem('userId');

        const requestData = {
          userId: userId,
          userName: formData.userName,
          userEmail: formData.userEmail,
          password: formData.password
        };

        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(`${apiEndpoint}/User/update-user-info/${userId}/${perfilId}`, requestData,{
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          
          // La respuesta exitosa se encuentra en response.data.
          console.log('Registro exitoso:', response.data);
          localStorage.setItem('userName', formData.username);
          props.handleHide()
          // Realiza las acciones que desees después del registro exitoso, como redireccionar a una página de inicio de sesión, mostrar un mensaje de éxito, etc.
        } catch (error) {
          if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error en la solicitud, verifique los datos ingresados")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Usuario no encontrado")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
        } 

      }else{
        alert ("Contraseña no coincidente o campos vacíos");
      }
    }

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
                                                    
                                            id="userEmail" label="Correo electrónico" type="email" variant="standard" onChange={handleInputChange}/>

                                    </Box>

                                                                  
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={user} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="userName" label="Nombre de Usuario" variant="standard" onChange={handleInputChange}/>

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={key} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="password" label="Contraseña" type="password" variant="standard" onChange={handleInputChange}/>

                                    </Box>

                                    
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={repeat} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard" label="Confirmar Contraseña"  type="password" variant="standard" onChange={handleChangeRepeatPass}/>

                                    </Box>

                        
                                    </Stack>
            </Modal.Body>
            <Modal.Footer>
                <div className='ms-auto p-2'>
                  <Button variant="secondary" className="btn btn-secondary me-2" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={clickSaveForm}>
                    Guardar Cambios
                  </Button>
              </div>
            </Modal.Footer>
          </Modal>
    )

}

export default ChangeUserInfoModal;