import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

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
import { access, exit, create, recover, init } from '../../features/login/loginAction'

const CrearCuenta = () => {
    const dispatch = useDispatch()

    return(
        <div className="crearCuenta card mx-auto my-1   p-5">
    <IconButton onClick={() => dispatch(init())}  className="backButton" aria-label="back">
              <ArrowBackIcon />
            </IconButton>

        <div className="card-body">
      
        <h5 className="card-title my-3">Crear Cuenta</h5>
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
                   
          id="standard-usercreate" label="Usuario" variant="standard" />

</Box>

<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <img className='icons' src={mail} height="24" width="24" alt="Mail" />
         <TextField fullWidth  
                   
          id="standard-mailcreate" label="Correo Electrónico"  type="email" variant="standard" />

</Box>

<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

<img className='icons' src={key} height="24" width="24" alt="User" />

         <TextField fullWidth  
               
          id="standard-passwordcreate" label="Contraseña"  type="password" variant="standard" />
</Box>

<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

<img className='icons' src={repeat} height="24" width="24" alt="Repeat" />

         <TextField fullWidth  
               
          id="standard-repeatcreate" label="Repetir Contraseña"  type="password" variant="standard" />
</Box>

<button type="button" onClick={() => dispatch(access())} className="createBtn shadow-sm btn btn-primary px-4 rounded-pill  ">Crear Cuenta</button>
         </Stack>
        </div>
       
        </div>
        </div>

    );

}

export default CrearCuenta;