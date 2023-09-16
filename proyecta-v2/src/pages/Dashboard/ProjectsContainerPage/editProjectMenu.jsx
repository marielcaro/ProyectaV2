import './editProjectMenu.css'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { access, exit, create, recover, init } from '../../../features/login/loginAction'

const EditProjectMenu = (props) => {
  const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickFotoEdit = (event) => {
      props.handleShowFoto()
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

return(
    <div> 
       <Paper>
        <MenuList>
          <MenuItem onClick={handleClickFotoEdit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                       
                                          Editar Foto

                                    </Box></MenuItem>
          <MenuItem><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        
                                          Editar Información del Proyecto

                                    </Box></MenuItem>
          <Divider sx={{ my: 0.5 , borderColor: '#212529'}} />
          <MenuItem ><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        
                                         Dar de baja el Proyecto

                                    </Box></MenuItem>
        </MenuList>
      </Paper>
    </div>
)
}

export default EditProjectMenu;