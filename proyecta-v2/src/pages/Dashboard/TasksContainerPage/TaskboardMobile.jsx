import './tasksContainerPage.css'
import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemButton from '@mui/material/ListItemButton';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './TaskboardMobile.css';


const TaskboardMobile= (props) => {
    const [openNews, setOpenNews] = React.useState(true);
    const [openInProgress, setOpenInProgress] = React.useState(true);
    const [openResolved, setOpenResolved] = React.useState(true);
    const [openEnded, setOpenEnded] = React.useState(true);
    const [newTaskList, setNewTaskList] = useState(props.projectAllInfo.newTasks);

    const [inProgressTaskList, setInProgressTaskList] = useState(props.projectAllInfo.inProgressTasks);
  
    const [resolvedTaskList, setResolvedTaskList] = useState(props.projectAllInfo.resolvedTasks);
  
    const [completedTaskList, setCompletedTaskList] = useState(props.projectAllInfo.endedTasks);
    const [status, setStatus] = React.useState('newTasks');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleClickNews = () => {
        setOpenNews(!openNews);
    };

    const handleClickInProgress = () => {
        setOpenInProgress(!openInProgress);
      };

      const handleClickResolved = () => {
        setOpenResolved(!openResolved);
      };

      const handleClickEnded = () => {
        setOpenEnded(!openEnded);
      };
      
      const listItems = (status) => {
        let listItem = [];
        let elements =[]
        switch(status){
            case 'newTasks':
                elements = newTaskList;
                break;
            case 'inProgressTasks':
                elements = inProgressTaskList;
                break;
            case 'resolvedTasks':
                elements = resolvedTaskList;
                break;
            case 'endedTasks':
                elements = completedTaskList;
                break; 
        }
        
            for(var i=0;i<elements.length;i++){
              // push the component to elements!
              listItem.push( 
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={elements[i].title} secondary={elements[i].endDate.replace('T', ' ')}  />
                </ListItemButton>);
        }
    
        return listItem;
    }

    

return(
    <>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Seleccionar Lista de Tareas</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Seleccionar Lista de Tareas"
          onChange={handleChange}
        >
          <MenuItem value='newTasks'>Nuevas</MenuItem>
          <MenuItem value='inProgressTasks'>En Progreso</MenuItem>
          <MenuItem value='resolvedTasks'>Resueltas</MenuItem>
          <MenuItem value='endedTasks'>Finalizadas</MenuItem>

        </Select>
      </FormControl>

        <List component="nav" aria-label="main mailbox folders" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

        {listItems(status)}

    </List>
    </>
)

}

export default TaskboardMobile