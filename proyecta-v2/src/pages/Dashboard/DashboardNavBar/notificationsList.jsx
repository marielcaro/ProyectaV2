import './userMenu.css'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import * as React from 'react';

const NotificationsList = () => {

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
                            Mensaje 1
                                    </Box></MenuItem>
          <MenuItem><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                         Mensaje 2

                                    </Box></MenuItem>
          <MenuItem><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                          Mensaje 3

                                    </Box></MenuItem>
        </MenuList>
      </Paper>
    </div>
)
}

export default NotificationsList;