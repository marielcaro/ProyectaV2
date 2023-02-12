import './registerUserPage.css';

import Stack from '@mui/material/Stack';
import ImageUploader from '../../components/imageUploader/imageUploader';

import * as React from 'react';
import BasicDatePicker from '../../components/DatePicker/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


import fullname from '../../assets/icons/name.png'
import nrodni from '../../assets/icons/nrodni.png'
import calendar from '../../assets/icons/calendar.png'


import career from '../../assets/icons/career.png'
import graduado from '../../assets/icons/grado.png'
import degree from '../../assets/icons/degree.png'
import subject from '../../assets/icons/subject.png'
import role from '../../assets/icons/role.png'
import university from '../../assets/icons/university.png'
import user from '../../assets/icons/user.png'
import key from '../../assets/icons/key.png'
import email from '../../assets/icons/mail.png'
import repeat from '../../assets/icons/repeat.png'

import { useSelector, useDispatch } from 'react-redux'
import { access, recover, exit, create, init } from '../../features/login/loginAction'

import MainNavBar from '../../components/mainNavBar/mainNavBar';

const RegisterUserPage = () => {
  const dispatch = useDispatch()

  const [grado, setGrado] = React.useState('');

  const handleChange = (event) => {
    setGrado(event.target.value);
  };

    return (
      <>
               <MainNavBar />

        <div className='registerUser container-fluid  d-flex flex-grow-1 flex-column'>
      <div className='row  d-flex my-4 flex-grow-1  align-items-center' >
      <div className='registerPage col  col-12 '>
                <div className="card">
                <div className="card-body py-5">
                    <h5 className="card-title my-3">¡Bienvenid@!</h5>
                    <h6 className="card-subtitle mb-5  text-muted">
                     <p>¡Qué bueno tenerte a bordo! </p> 
                      <p>Quisiéramos saber un poco más sobre vos:</p> </h6>
                      <div className="container">
                        <div className="row d-flex  my-3 justify-content-evenly">
                          <div className="formColumn col  col-12 col-sm-12 col-md-4  col-lg-4 col-xl-4">
                                  <Stack spacing={2}>
                                    <div>
                                      <p style={{marginBottom:0}}>Subí una foto para tu perfil de usuario:</p>
                                    <ImageUploader />
                                    </div>
                                  
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={fullname} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard" label="Nombre y Apellido Completo" variant="standard" />

                                    </Box>

                                   
                                    
                                  </Stack>
                          </div>
                          <div className="formColumn col col-12 col-sm-12 col-md-4  col-lg-4 col-xl-4">
                          <Stack spacing={2}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={nrodni} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard" label="Número de documento" type="number" variant="standard" />

                                    </Box>

                                  <BasicDatePicker/>
                                  
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

                          <div className="formColumn col col-12 col-sm-12 col-md-4  col-lg-4 col-xl-4">
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

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <button type="button" className="createBtn shadow-sm  btn btn-primary px-4 rounded-pill  " onClick={() => dispatch(access())}>Crear Cuenta</button>
                                    </Box>
                                    </Stack>
                          </div>
                        </div>
                        </div>
                  </div>
          </div>

        </div>

       
      </div>
  
    </div> 
    </>
    )
    }
    
    export default RegisterUserPage ;