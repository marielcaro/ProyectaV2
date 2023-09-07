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
import ModalTask from './ModalTask';
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

    const [showEditModal, setShowEditModal] = useState(false);

    const [taskData, setTaskData] = useState( {
      id: "607386e5-e1ad-4d25-bffb-a3b98131ced9", 
      title: "Task 1",
      projectName : "Proyecto 1",
     lastUpdatedUser: "Mariel Caro",
      lastUpdatedDate:"2023-08-23T18:00:00",
      status: "ended",
      author:"Hernan Peinetti",
      endDate:"2023-08-30T18:00:00",
      description: "Descripción 1: Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra.",
      members: [
         {label:"Mariel Caro", 
         userId: 1},
         {label:"Mica Chamut", 
         userId: 2}
      ] }) 
  
    const [selectedTaskId, setSelectedTaskId] =useState('');
    const [allAllowedMembers, setAllowedMembers] =useState(props.projectAllInfo.allProjectMembers);

    const handleClose = () => setShowEditModal(false);
    const handleShow = () => setShowEditModal(true);

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleClickCard= (event) => {
      
      setSelectedTaskId(event.currentTarget.id)
      handleShow()
    }

    const searchTask = (id) => {
      let allTasks = [];
      props.data.projects.forEach(project => {
        allTasks= allTasks.concat(project.newTasks).concat(project.inProgressTasks).concat(project.resolvedTasks).concat(project.endedTasks);
      });
      
      let task = allTasks.find(task => task.id === id)
  
      return task
    }
  
    useEffect(()=> {
      let selectedTask=searchTask(selectedTaskId)
      setTaskData((taskData)=>({...taskData,...selectedTask}))
      console.log(selectedTaskId)
    },[selectedTaskId])

    useEffect(()=> {
  
      setNewTaskList(props.projectAllInfo.newTasks)
      setInProgressTaskList(props.projectAllInfo.inProgressTasks)
      setResolvedTaskList(props.projectAllInfo.resolvedTasks)
      setCompletedTaskList(props.projectAllInfo.endedTasks)
    
    },[props.projectAllInfo])

    useEffect(()=> {
  
      setNewTaskList(props.projectAllInfo.newTasks)
      
    
    },[props.projectAllInfo.newTasks])

    useEffect(()=> {
  
      setInProgressTaskList(props.projectAllInfo.inProgressTasks)
      
    
    },[props.projectAllInfo.inProgressTasks])


    useEffect(()=> {
  
      setResolvedTaskList(props.projectAllInfo.resolvedTasks)
      
    
    },[props.projectAllInfo.resolvedTasks])


    useEffect(()=> {
  
      setCompletedTaskList(props.projectAllInfo.endedTasks)
      
    
    },[props.projectAllInfo.endedTasks])

    
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
                <ListItemButton id={elements[i].id} onClick={handleClickCard} target="#editTaskModal">
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={elements[i].title} secondary={ typeof(elements[i].endDate) === 'string' ? elements[i].endDate.replace('T', ' ') :  elements[i].endDate.toISOString().replace('T', ' ').split('.')[0] }  />
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

    <ModalTask taskData={taskData} mobile={true} taskId={selectedTaskId} modalEditState={showEditModal}  action="edit" handleShow={()=> handleShow()}  handleClose={()=> handleClose()} handleDelete={(id) => props.handleDelete(id)} handleSave={(id, task) => props.handleSave(id, task)}  allAllowedMembers={allAllowedMembers} />

    </>
)

}

export default TaskboardMobile