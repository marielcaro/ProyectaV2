import React, { useEffect, useState, useRef } from 'react';
import './changeProfile.css'
import Stack from '@mui/material/Stack';
import ImageUploader from '../../../components/imageUploader/imageUploader';
import axios from 'axios';
import ErrorToast from '../../../components/Toast/ErrorToast';


import { Button, Modal } from 'react-bootstrap';

import BasicDatePicker from '../../../components/DatePicker/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import career from '../../../assets/icons/career.png'
import graduado from '../../../assets/icons/grado.png'
import subject from '../../../assets/icons/subject.png'
import university from '../../../assets/icons/university.png'


const ChangeProfileModal = (props) => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

    const [show, setShow] = useState(props.show);
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.profile.value)
    const [grado, setGrado] = React.useState('');
    const [gradoOptions, setGradoOptions] = useState([]);

    const [formData, setFormData] = useState({
      carreraProfesional: '',
      universidad: '',
      categoria: '',
      fotoPerfil: '',
      principalArea: ''
    });
  
    const handleInputChange = (e) => {
      const { id, value } = e.currentTarget;
      setFormData({
        ...formData,
        [id]: value,
      });
    };

    const handleChange = (event) => {
      setGrado(event.target.value);
    };

    const handleSaveChanges = () => {
        props.handleHide()
    }

    const handleClose = () => props.handleHide();

    const clickSaveForm = async () => {
      if ( formData.universidad && formData.carreraProfesional && formData.principalArea){
        const requestData = {
            carreraProfesional: formData.carreraProfesional,
            universidad: formData.universidad,
            fotoPerfil: profile.payload,
            principalArea: formData.principalArea,
            categoria: grado !== "" ? grado : null  
        };

        try {
          const token = localStorage.getItem('token');
          const id =localStorage.getItem('perfilId');
          const response = await axios.put(`${apiEndpoint}/Perfil/ModificarPerfil?id=${id}`, requestData,{
            headers: {
              Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
            },
          });
          
          // La respuesta exitosa se encuentra en response.data.
          console.log('Registro exitoso:', response.data);
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
        alert ("Algunos datos están vacíos, por favor verifique antes de guardar los cambios");
      }
    }

       // Función para obtener las opciones de "último grado alcanzado" desde el servidor.
   const fetchGradoOptions = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${apiEndpoint}/Categorias/GetAll`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });

      setGradoOptions(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
          {
            ErrorToast("Acceso no Autorizado")
          }else{
            if(error.response.status === 400){
              ErrorToast("Error en la solicitud")
            }else if(error.response.status === 404){
              ErrorToast("No existen categorias académicas ingresados")
            }else if(error.response.status === 500){
              ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
            }
          } 
    }
  };

    useEffect(()=>{
        setShow(props.show)
      },[props.show])

      useEffect(() => {
        fetchGradoOptions();
      }, []);

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
                                                    
                                            id="principalArea" label="Principal Área de Investigación" variant="standard" onChange={handleInputChange} />

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={career} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="carreraProfesional" label="Carrera Universitaria" variant="standard" onChange={handleInputChange}/>

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
                                        {gradoOptions.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.nombreCategoria} {/* Asume que "nombre" es el nombre del grado. */}
                                            </MenuItem>
                                          ))}
                                      </Select>
                                      </FormControl>
                                      </div>

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={university} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="universidad" label="Universidad" variant="standard" onChange={handleInputChange}/>

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
                  <Button variant="primary" onClick={clickSaveForm}>
                    Guardar Cambios
                  </Button>
              </div>
            </Modal.Footer>
          </Modal>
    )

}

export default ChangeProfileModal;