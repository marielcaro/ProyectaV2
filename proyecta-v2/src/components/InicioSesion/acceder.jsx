import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import user from '../../assets/icons/user.png'
import key from '../../assets/icons/key.png'
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import {  useDispatch } from 'react-redux'
import { access, recover,register } from '../../features/login/loginAction'
import axios from 'axios';
import ErrorToast from '../Toast/ErrorToast';
import Loader from '../Loader/Loader';
import SuccessToast from '../../components/Toast/SuccessToast';

const Acceder = () => {
  const [loading, setLoading] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;


    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
      username: '',
      password: '',
  });

  const [userData, setUserData] = useState({
    userId: null,
    userName: '',
    token: '',
    refreshToken:'',
    perfilId:''
});


  const handleLogin = async () => {
    try {
      setLoading(true);
        const response = await axios.post(`${apiEndpoint}/Authentication/login`, formData);
          setUserData({
            userId: response.data.userId,
            userName: response.data.userName,
            token: response.data.token,
            refreshToken: response.refreshToken,
            perfilId: response.data.perfilId
        });
     
     
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('userName', formData.username);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('perfilId', response.data.perfilId);

          if(response.status === 200){
            SuccessToast("Acceso Exitoso");
          }
        // Aquí debes manejar la respuesta de la API, por ejemplo, almacenar el token de autenticación en el estado de tu aplicación o redirigir al usuario a la página principal.
        console.log(response.data);
    

   
    } catch (error) {
          // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario.
      if(error.response.status === 401)
      {
        ErrorToast("Usuario o Contraseña incorrectos, por favor verifique los datos ingresados")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error interno, Usuario no encontrado")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Usuario no encontrado")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      }   
       
    }  finally{
      setLoading(false); // Oculta el Loader después de la petición (éxito o fallo)
    }
  
};

const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
};

useEffect(()=>{
  const token = localStorage.getItem('token');
  const perfilId = localStorage.getItem('perfilId');
  if(token && perfilId){
    dispatch(access())
  }
},[userData])


    return(
        <div className="inicioSesion card mx-auto my-1   p-5">
 {loading && <Loader />} {/* Muestra el Loader cuando `loading` es true */}
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

<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <img className='icons' src={user} height="24" width="24" alt="User" />
         <TextField fullWidth                     
          id="username" label="Usuario" variant="standard"  onChange={handleChange}/>

</Box>

<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

<img className='icons' src={key} height="24" width="24" alt="User" />

         <TextField fullWidth                 
          id="password" label="Contraseña"  type="password" variant="standard"  onChange={handleChange}/>
</Box>

         <button onClick={() => dispatch(recover())} type="button" className="recover btn btn-link">¿Olvidaste tu Contraseña?</button>

         <button onClick={handleLogin} type="button" className="access shadow-sm btn btn-primary px-4 rounded-pill  ">Ingresar</button>

            <h6> ¿Aún no tienes una cuenta?</h6>
            <button type="button" onClick={() => dispatch(register())} className="createBtn shadow-sm btn btn-primary px-4 rounded-pill  ">Crear Cuenta</button>

         </Stack>
        </div>
       
        </div>
        </div>

    );


}

export default Acceder;


