import './editProjectMenu.css'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { access, exit, create, recover, init } from '../../../features/login/loginAction'

const EditProjectMenu = () => {
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
          <MenuItem>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                       
                                          Editar Foto

                                    </Box></MenuItem>
          <MenuItem><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        
                                          Editar Información del Proyecto

                                    </Box></MenuItem>
          <Divider sx={{ my: 0.5 , borderColor: '#212529'}} />
          <MenuItem onClick={() => dispatch(exit())}><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        
                                          Administrar Integrantes

                                    </Box></MenuItem>
        </MenuList>
      </Paper>
    </div>
)
}

export default EditProjectMenu;