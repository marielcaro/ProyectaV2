import React, { useEffect, useState } from 'react';
import './membersListPage.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { deepOrange, red, blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MembersListPage = (props) => {

    return(
        <div className="listContainer">
             <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: deepOrange[500] }}
                alt="Integrante"
                src="/broken-image.jpg">
            
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Nombre Apellido" secondary="Rol" />
        <IconButton aria-label="Eliminar" color="error">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="Editar" color="primary">
            <EditIcon />
          </IconButton>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: deepOrange[500] }}
                alt="Integrante"
                src="/broken-image.jpg">
            
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Nombre Apellido" secondary="Rol" />
        <IconButton aria-label="Eliminar" color="error">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="Editar" color="primary">
            <EditIcon />
          </IconButton>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: deepOrange[500] }}
                alt="Integrante"
                src="/broken-image.jpg">
            
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Nombre Apellido" secondary="Rol" />
        <IconButton aria-label="Eliminar" color="error">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="Editar" color="primary">
            <EditIcon />
          </IconButton>
      </ListItem>
    </List>
        </div>
    )
}

export default MembersListPage;