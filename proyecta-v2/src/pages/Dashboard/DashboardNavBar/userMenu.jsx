import './userMenu.css'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';


import ajustes from '../../../assets/icons/ajustes.png'
import logout from '../../../assets/icons/logout.png'
import user from '../../../assets/icons/user.png'

import * as React from 'react';

const UserMenu = () => {

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
          <MenuItem>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={user} height="16" width="16" alt="User" />
                                          Mi Perfil

                                    </Box></MenuItem>
          <MenuItem><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={ajustes} height="16" width="16" alt="User" />
                                          Mi Cuenta

                                    </Box></MenuItem>
          <Divider sx={{ my: 0.5 , borderColor: '#212529'}} />
          <MenuItem><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={logout} height="16" width="16" alt="User" />
                                          Salir

                                    </Box></MenuItem>
        </MenuList>
      </Paper>
    </div>
)
}

export default UserMenu;