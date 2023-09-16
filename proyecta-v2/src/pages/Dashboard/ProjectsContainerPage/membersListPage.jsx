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
    const [allMembers, setAllMembers] = useState(props.members);

    useEffect(()=>{
        if(props.members){
            setAllMembers(props.members)
        }
    },[props.members])
    return(
        <div className="listContainer">
             <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
        {allMembers.map((member, index) => (
                    <ListItem id={member.userId}>
                    <ListItemAvatar>
                        
                    <Avatar sx={{ bgcolor: deepOrange[500] }}
                            alt={member.label}
                            src={member.icon}>
                        
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={member.label} secondary={member.role.charAt(0).toUpperCase() + member.role.slice(1)} />
                    <IconButton aria-label="Eliminar" color="error">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Editar" color="primary">
                        <EditIcon />
                    </IconButton>
                    </ListItem>
        ))}

     
    
    </List>
        </div>
    )
}

export default MembersListPage;