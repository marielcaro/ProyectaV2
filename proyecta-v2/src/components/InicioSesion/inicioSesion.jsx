
import './inicioSesion.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import KeyIcon from '@mui/icons-material/Key';

const InicioSesion = () => {


    return (
    
        <div className='box  h-100'>
          
          <div className="inicioSesion card mx-auto w-75 h-100 p-5">
        <div className="card-body">
        <h5 className="card-title my-3">Iniciar Sesión</h5>
        <div className='form m-auto p-4 align-items-center'>
        <Stack
      component="form"
      sx={{
             
        width: '100%',
        maxWidth: '100%',
      }}
      direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={4}
      noValidate
      autoComplete="off"
    >
         <TextField fullWidth  
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PermIdentityIcon />
              </InputAdornment>
            ),
          }}
          
          id="standard-basic" label="Usuario" variant="standard" />

         <TextField fullWidth  
         
         InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          id="standard-basic" label="Contraseña" variant="standard" />

         <button type="button" className="recover btn btn-link">¿Olvidaste tu Contraseña?</button>

         <button type="button" className="access shadow-sm btn btn-primary px-4 rounded-pill  ">Ingresar</button>

            <h7> ¿Aún no tienes una cuenta?</h7>
         <button type="button" className="recover btn btn-link">Crear una Cuenta</button>
         </Stack>
        </div>
       
        </div>
        </div>
        </div>
    
    )
    }
    
    export default InicioSesion ;