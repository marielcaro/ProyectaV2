import './registerUserPage.css';

import Stack from '@mui/material/Stack';
import ImageUploader from '../../components/imageUploader/imageUploader';
import ImageDragDropUploader from '../../components/imageUploader/imageDragDropUploader';

import * as React from 'react';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


import fullname from '../../assets/icons/name.png'
import nrodni from '../../assets/icons/nrodni.png'
import calendar from '../../assets/icons/calendar.png'


import career from '../../assets/icons/career.png'
import grado from '../../assets/icons/grado.png'
import degree from '../../assets/icons/degree.png'
import subject from '../../assets/icons/subject.png'
import role from '../../assets/icons/role.png'
import university from '../../assets/icons/university.png'

const RegisterUserPage = () => {

  const [value, setValue] = React.useState<Dayjs | null>(null);

    return (
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
                          <div className="formColumn col  col-12 col-sm-12 col-md-6  col-lg-6 col-xl-6">
                                  <Stack spacing={2}>
                                    <div>
                                      <p style={{marginBottom:0}}>Subí una foto para tu perfil de usuario:</p>
                                    <ImageUploader />
                                    </div>
                                  
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={fullname} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard-basic" label="Nombre y Apellido Completo" variant="standard" />

                                    </Box>

                                   
                                    
                                  </Stack>
                          </div>
                          <div className="formColumn col-12 col-sm-12 col-md-6  col-lg-6 col-xl-6">
                          <Stack spacing={2}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={nrodni} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard-basic" label="Número de documento" variant="standard" />

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={calendar} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard-basic" label="Fecha de nacimiento" variant="standard" />

                                    </Box>


                                 <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={subject} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard-basic" label="Principal Área de Investigación" variant="standard" />

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={career} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard-basic" label="Carrera Universitaria" variant="standard" />

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={grado} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard-basic" label="Último grado alcanzado" variant="standard" />

                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={university} height="24" width="24" alt="User" />
                                          <TextField fullWidth  
                                                    
                                            id="standard-basic" label="Universidad" variant="standard" />

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
    )
    }
    
    export default RegisterUserPage ;