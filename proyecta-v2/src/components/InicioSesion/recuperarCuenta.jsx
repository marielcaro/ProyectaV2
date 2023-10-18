import Stack from '@mui/material/Stack';
import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import user from '../../assets/icons/user.png'
import key from '../../assets/icons/key.png'
import mail from '../../assets/icons/mail.png'
import repeat from '../../assets/icons/repeat.png'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import KeyIcon from '@mui/icons-material/Key';

import { useSelector, useDispatch } from 'react-redux'
import { access, exit, create, recover, init, login } from '../../features/login/loginAction'

const RecuperarCuenta = () => {
    const dispatch = useDispatch();
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    const [repeatedPass, setRepeatedPass] =useState("");

    const [formData, setFormData] = useState({
      email:"",
      username: "",
      newPassword: ""
    });

    const handleChangeRepeatPass = (e) => {
      setRepeatedPass(e.currentTarget.value);
    }

    const handleInputChange = (e) => {
      const { id, value } = e.currentTarget;
      setFormData({
        ...formData,
        [id]: value,
      });
    };

    const clickSaveForm = async () => {
      if ( formData.email && formData.username && formData.newPassword && (formData.newPassword === repeatedPass)){
    
        const requestData = {
          username: formData.username,
          email: formData.email,
          newPassword: formData.newPassword
        };

        try {
          const response = await axios.post(`${apiEndpoint}/Authentication/reset-password`, requestData);
          
          // La respuesta exitosa se encuentra en response.data.
          console.log('Contraseña Recuperada correctamente:', response.data);
          dispatch(login());
          // Realiza las acciones que desees después del registro exitoso, como redireccionar a una página de inicio de sesión, mostrar un mensaje de éxito, etc.
        } catch (error) {
          // En caso de error, puedes manejarlo aquí.
          console.error('Usuario inexistente', error);
          // Puedes mostrar un mensaje de error al usuario o realizar otras acciones según tus necesidades.
        } 

      }else{
        alert ("Contraseña no coincidente o campos vacíos");
      }
    }

    return(
        <div className="recuperarCuenta card mx-auto my-1   p-5">
   <IconButton onClick={() => dispatch(init())} className="backButton" aria-label="back">
              <ArrowBackIcon />
            </IconButton>
        <div className="card-body">
        <h5 className="card-title my-3">Recuperar Contraseña</h5>
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
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <img className='icons' src={user} height="24" width="24" alt="User" />
         <TextField fullWidth  
                   
          id="email" label="Correo Electrónico" variant="standard" onChange={handleInputChange}/>

</Box>


<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <img className='icons' src={user} height="24" width="24" alt="User" />
         <TextField fullWidth  
                   
          id="username" label="Usuario" variant="standard" onChange={handleInputChange}/>

</Box>

<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

<img className='icons' src={key} height="24" width="24" alt="User" />

         <TextField fullWidth  
               
          id="newPassword" label="Contraseña"  type="password" variant="standard" onChange={handleInputChange}/>
</Box>

<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

<img className='icons' src={repeat} height="24" width="24" alt="Repeat" />

         <TextField fullWidth  
               
          id="standard-repeatrecover" label="Repetir Contraseña"  type="password" variant="standard" onChange={handleChangeRepeatPass}/>
</Box>

<button type="button" className="recoverBtn shadow-sm btn btn-primary px-4 rounded-pill  " onClick={clickSaveForm} >Recuperar</button>
         </Stack>
        </div>
       
        </div>
        </div>

    );

}

export default RecuperarCuenta;