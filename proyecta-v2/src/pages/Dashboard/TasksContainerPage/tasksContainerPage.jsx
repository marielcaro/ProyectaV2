
import './tasksContainerPage.css'
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Taskboard from './Taskboard';
import Grid from '@mui/material/Unstable_Grid2';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import ModalTask from './ModalTask';
import data from "./mockData.json"

const TasksContainerPage = () => {
  const projects =[{id: 1, projectName:'Proyecto 1'},{id: 2, projectName:'Proyecto 2'},{id: 3, projectName:'Proyecto 3'},{id: 4, projectName:'Proyecto 4'}];
  const listIds =[{id: 0, listName:'newTasks'},{id: 1, listName:'inProgressTasks'},{id: 2, listName:'resolvedTasks'},{id: 3, listName:'endedTasks'}];

  const [project, setProject] = useState(projects[0].id);
  const [projectInfo, setProjectInfo] = useState(data.projects.find(x => x.projectId === projects[0].id));
 const [dataAux, setDataAux] = useState(data);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState(null);

  const handleClose = () => setShowNewTaskModal(false);
  const handleShow = () => setShowNewTaskModal(true);

  const items = (elements) => {
    let listItem = [];

        for(var i=0;i<elements.length;i++){
          // push the component to elements!
          listItem.push( <MenuItem value={elements[i].id}> {elements[i].projectName} </MenuItem>);
    }

    return listItem;
}



  const theme = createTheme({
    palette: {
      primary: {
        light: '#EB5401',
        main: '#EB5401',
        dark: ' #EB5401',
        contrastText: '#ffffff',
      },
    },
  });

  const handleChange = (event) => {
    setProject(event.target.value);
  };

  const searchTask = (id) => {
    let allTasks = [];
    data.projects.forEach(project => {
      allTasks= allTasks.concat(projectInfo.newTasks).concat(projectInfo.inProgressTasks).concat(projectInfo.resolvedTasks).concat(projectInfo.endedTasks);
    });
    
    let task = allTasks.find(task => task.id === id)

    return task
  }

  const handleDeleteTask = (id) => {
    let selectedTask=searchTask(id)

    switch(selectedTask.status){
      case "new":
        let auxNewTaskList = [...projectInfo.newTasks]
        let newTaskIndex =  projectInfo.newTasks.findIndex(item => item.id === selectedTask.id);
        auxNewTaskList = auxNewTaskList.slice(0, newTaskIndex).concat(auxNewTaskList.slice(newTaskIndex + 1));
        setProjectInfo({...projectInfo, 
          'newTasks': auxNewTaskList})

      break;

      case "inProgress":
        let auxInProgressTaskList = [...projectInfo.inProgressTasks]
        let inProgressIndex =  projectInfo.inProgressTasks.findIndex(item => item.id === selectedTask.id);
        auxInProgressTaskList = auxInProgressTaskList.slice(0, inProgressIndex).concat(auxInProgressTaskList.slice(inProgressIndex + 1));
        setProjectInfo({...projectInfo, 
          'inProgressTasks': auxInProgressTaskList})

      break;

      case "resolved":
        let auxResolvedTaskList = [...projectInfo.resolvedTasks]
        let resolvedIndex =  projectInfo.resolvedTasks.findIndex(item => item.id === selectedTask.id);
        auxResolvedTaskList = auxResolvedTaskList.slice(0, resolvedIndex).concat(auxResolvedTaskList.slice(resolvedIndex + 1));
        setProjectInfo({...projectInfo, 
          'resolvedTasks': auxResolvedTaskList})

      break;

      case "ended":
        let auxEndedTaskList = [...projectInfo.endedTasks]
        let endedIndex =  projectInfo.endedTasks.findIndex(item => item.id === selectedTask.id);
        auxEndedTaskList = auxEndedTaskList.slice(0, endedIndex).concat(auxEndedTaskList.slice(endedIndex + 1));
        setProjectInfo({...projectInfo, 
          'endedTasks': auxEndedTaskList})

      break;

    }
    
  }

  const handleSaveTask = (id, taskDataChange) => {
    let selectedTask=searchTask(id)

    switch(selectedTask.status){
      case "new":
        let auxNewTaskList = [...projectInfo.newTasks]
        let newTaskIndex =  projectInfo.newTasks.findIndex(item => item.id === selectedTask.id);
        auxNewTaskList[newTaskIndex] = taskDataChange;
        setProjectInfo({...projectInfo, 
          'newTasks': auxNewTaskList})

      break;

      case "inProgress":
        let auxInProgressTaskList = [...projectInfo.inProgressTasks]
        let inProgressIndex =  projectInfo.inProgressTasks.findIndex(item => item.id === selectedTask.id);
        auxInProgressTaskList[inProgressIndex] = taskDataChange;
        setProjectInfo({...projectInfo, 
          'inProgressTasks': auxInProgressTaskList})

      break;

      case "resolved":
        let auxResolvedTaskList = [...projectInfo.resolvedTasks]
        let resolvedIndex =  projectInfo.resolvedTasks.findIndex(item => item.id === selectedTask.id);
        auxResolvedTaskList[resolvedIndex] = taskDataChange;
        setProjectInfo({...projectInfo, 
          'resolvedTasks': auxResolvedTaskList})

      break;

      case "ended":
        let auxEndedTaskList = [...projectInfo.endedTasks]
        let endedIndex =  projectInfo.endedTasks.findIndex(item => item.id === selectedTask.id);
        auxEndedTaskList[endedIndex] = taskDataChange;
        setProjectInfo({...projectInfo, 
          'endedTasks': auxEndedTaskList})

      break;

    }
    
  }

  const handleSaveNewTask = (task) => {
    let newTasks = [...projectInfo.newTasks]
    newTasks.push(task)
    
    setProjectInfo({...projectInfo, 
        'newTasks': newTasks})

          let index = projects.findIndex( x => x.id ===project);
        const newTasktoAdd = {
          "id":  uuidv4(), 
          "title": "",
          "projectName" : projects[index].projectName,
          "lastUpdatedUser":"",
          "lastUpdatedDate":"",
          "status": "new",
          "author":"Hernan Peinetti",
          "endDate":"",
          "description": "",
          "members": [ ]
 
         };
         setNewTask(newTask => ({...newTask,
           ...newTasktoAdd
         }))

  }

  const handleMoveTask = (task, sourceId, destinationId) => {
    
    let index =dataAux.projects.findIndex(item => item.id === project.id);
    let  auxDataList = [...dataAux.projects];

    let source = listIds.find(x => x.id === parseInt(sourceId)).listName;
    let sourceList = auxDataList[index][source];
    let taskIndex =  sourceList.findIndex(item => item.id === task.id);
    auxDataList[index][source] = sourceList.slice(0, taskIndex).concat(sourceList.slice(taskIndex + 1));

    let dest = listIds.find(x => x.id === parseInt(destinationId)).listName;
     auxDataList[index][dest].push(task);

    setDataAux(data => ({...data,
      ...{"projects":auxDataList}}
    ))

  }

  const handleAddTask = () =>{
    let index = projects.findIndex( x => x.id ===project);
    
    const newTasktoAdd = {
         "id":  uuidv4(), 
         "title": "",
         "projectName" : projects[index].projectName,
         "lastUpdatedUser":"",
         "lastUpdatedDate":"",
         "status": "new",
         "author":"Hernan Peinetti",
         "endDate":"",
         "description": "",
         "members": [ ]

        };
        setNewTask(newTask => ({...newTask,
          ...newTasktoAdd
        }))

        setShowNewTaskModal(true)
  }

  useEffect(()=>{
    console.log(projectInfo)
    let auxDataList = [...dataAux.projects]
    let index =  dataAux.projects.findIndex(item => item.id === projectInfo.id);
    auxDataList[index] = projectInfo;

    setDataAux(data => ({...data,
      ...{"projects":auxDataList}}
    ))

  },[projectInfo])

  useEffect(()=>{
    if(project){
      let selectedProjectInfo = data.projects.find(x => x.projectId === project);
      setProjectInfo(selectedProjectInfo)
    }

  },[project])

    return(
        <div>

            <div  className="selectProjectBar mb-3 p-2 shadow-sm">
           
                  <Box sx={{ minWidth: 120 }}>
                  <Grid container spacing={2}>
                    <Grid xs={8}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Seleccionar Proyecto ...</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={project}
                          label="Seleccionar Proyecto ..."
                          onChange={handleChange}
                        >
                            {items(projects)}
                        </Select>
                      </FormControl>
                      </Grid>
                      <Grid className="gridButton py-2" xs={4}>
                      <ThemeProvider theme={theme}>
                        <Button className="newTask ms-0 my-2" variant="contained" color="primary" onClick={handleAddTask}> <AddIcon sx={{ color: grey[50] }}/>Nueva Tarea</Button>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
          </Box>
        
            </div>
            
            <div>
              <Taskboard projectAllInfo={projectInfo} data={dataAux} handleSave={(id, task) => handleSaveTask(id, task)} handleDelete={(id) => handleDeleteTask(id)}  handleMove={(task,sId, dId) => handleMoveTask(task,sId, dId)}/>
            </div>
   
            <ModalTask taskData={newTask} taskId={null} modalEditState={showNewTaskModal} action="new" handleShow={()=> handleShow()}  handleClose={()=> handleClose()} handleDelete={(id) => handleDeleteTask(id)} handleSave={(id, task) => handleSaveTask(id, task)} handleSaveNew={(task) => handleSaveNewTask(task)} allAllowedMembers={projectInfo.allProjectMembers} />
         </div>
     )
}

export default TasksContainerPage