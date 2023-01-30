import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import user from '../../assets/icons/user.png'
import key from '../../assets/icons/key.png'
import Box from '@mui/material/Box';


import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import KeyIcon from '@mui/icons-material/Key';

import { useSelector, useDispatch } from 'react-redux'
import { access, exit, create, recover } from '../../features/login/loginAction'

const Acceder = () => {
    const dispatch = useDispatch()

    return(
        <div className="inicioSesion card mx-auto my-4 w-100  p-5">

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
                   
          id="standard-basic" label="Usuario" variant="standard" />

</Box>

<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

<img className='icons' src={key} height="24" width="24" alt="User" />

         <TextField fullWidth  
               
          id="standard-basic" label="Contraseña" variant="standard" />
</Box>

         <button onClick={() => dispatch(recover())} type="button" className="recover btn btn-link">¿Olvidaste tu Contraseña?</button>

         <button onClick={() => dispatch(access())} type="button" className="access shadow-sm btn btn-primary px-4 rounded-pill  ">Ingresar</button>

            <h6> ¿Aún no tienes una cuenta?</h6>
         <button onClick={() => dispatch(create())} type="button" className="create btn btn-link">Crear una Cuenta</button>
         </Stack>
        </div>
       
        </div>
        </div>

    );


}

export default Acceder;


