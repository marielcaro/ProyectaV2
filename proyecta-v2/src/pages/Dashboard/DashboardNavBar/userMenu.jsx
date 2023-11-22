import './userMenu.css'

import * as React from 'react';
import { useState} from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import axios from 'axios';
import SuccessToast from '../../../components/Toast/SuccessToast.jsx';
import ajustes from '../../../assets/icons/ajustes.png'
import logout from '../../../assets/icons/logout.png'
import user from '../../../assets/icons/user.png'

import { useDispatch } from 'react-redux'
import { exit } from '../../../features/login/loginAction'
import { dashboard } from '../../../features/dashboard/dashboardAction.js'

import ChangeProfileModal from './changeProfile';
import ChangeUserInfoModal from './changeUserInfo';

const UserMenu = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const [showProfileModal, setShowProfileModal] =useState(false);
  const [showUserInfoModal, setShowUserInfoModal] =useState(false);

  const handleLogout = () => {
    const token = localStorage.getItem('token');

    // Obtiene el userName almacenado en localStorage
  const userName = localStorage.getItem('userName');
  const data = {
    userName: userName
  };
  
  const headers = {
    Authorization: `Bearer ${token}`,
    userName: userName
  };

  axios.post(`${apiEndpoint}/Authentication/logout?userName=${userName}`, data, { headers })
      .then(response => {
        // Procesa la respuesta del logout
        // ...
        localStorage.removeItem('token');

        // Limpia el userName de localStorage si es necesario
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('perfilId');

        dispatch(dashboard())
        if (response.status === 200) {
          // Registro exitoso
          SuccessToast("Saliendo de la aplicación...");
          
        }

        dispatch(exit());
      })
      .catch(error => {
        // Maneja cualquier error que pueda ocurrir durante el logout.
        console.error(error);
      });
  };

  const handleShowUserInfoModal = () =>{
    setShowUserInfoModal(true)
  }

  const handleHideUserInfoModal = () =>{
    setShowUserInfoModal(false)
  }



  const handleShowProfileModal = () =>{
    setShowProfileModal(true)
  }

  const handleHideProfileModal = () =>{
    setShowProfileModal(false)
  }

  const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

return(
    <div> 
       <Paper>
        <MenuList>
          <MenuItem onClick={handleShowProfileModal}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={user} height="16" width="16" alt="User" />
                                          Mi Perfil

                                    </Box></MenuItem>
          <MenuItem onClick={handleShowUserInfoModal}><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={ajustes} height="16" width="16" alt="User" />
                                          Mi Cuenta

                                    </Box></MenuItem>
          <Divider sx={{ my: 0.5 , borderColor: '#212529'}} />
          <MenuItem onClick={handleLogout}><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={logout} height="16" width="16" alt="User" />
                                          Salir

                                    </Box></MenuItem>
        </MenuList>
      </Paper>

      <ChangeProfileModal show={showProfileModal} handleHide={handleHideProfileModal} />
      <ChangeUserInfoModal show={showUserInfoModal} handleHide={handleHideUserInfoModal} />
    </div>
)
}

export default UserMenu;