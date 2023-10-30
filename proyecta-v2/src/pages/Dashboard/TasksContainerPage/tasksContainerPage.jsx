
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
import TaskboardMobile from './TaskboardMobile';
import Grid from '@mui/material/Unstable_Grid2';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import ModalTask from './ModalTask';
import data from "./mockData.json";
import axios from 'axios';
import ErrorToast from '../../../components/Toast/ErrorToast';


const TasksContainerPage = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [projects, setProjects] = useState([]);
  const listIds =[{id: 0, listName:'new'},{id: 1, listName:'inProgress'},{id: 2, listName:'resolved'},{id: 3, listName:'ended'}];

  const [project, setProject] = useState("");
  const [currentRolByProject, setCurrentRoleByProject] = useState("");
  const [projectInfo, setProjectInfo] = useState("");
 const [dataAux, setDataAux] = useState(data);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState(null);
  const [mobile, setMobile] = useState(window.innerWidth <= 500);

const handleWindowSizeChange = () => {
  setMobile(window.innerWidth <= 500);
}

  const handleClose = () => setShowNewTaskModal(false);
  const handleShow = () => setShowNewTaskModal(true);

  const items = (elements) => {
    let listItem = [];

        for(var i=0;i<elements.length;i++){
          // push the component to elements!
          listItem.push( <MenuItem value={elements[i].proyectId}> {elements[i].proyectName} </MenuItem>);
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

    fetchDeleteTask(id)
    
  }

  const handleSaveTask = (id, taskDataChange) => {
    fetchUpdateInfoTask(id, taskDataChange)

    
  }

  const handleSaveNewTask =async  (task) => {

    const autor =  await fetchNameByPerfilId();

    fetchAddNewTask(task);

          let index = projects.findIndex( x => x.id ===project);
        const newTasktoAdd = {
          "tareaId":  uuidv4(), 
         "nombreTarea": "",
         "proyectoGuid" : projects[index].proyectId,
         "nombreProyecto" : projects[index].proyectName,
         "autor": autor.nombreCompleto,
         "autorGuid":autor.id,
         "estado":"new",
         "fechaFin":"",
         "descripcion": "",
         "listaIntegrantes": [ ]

        };
         setNewTask(newTask => ({...newTask,
           ...newTasktoAdd
         }))

  }

  const handleReorderTask = (task, endOrder) => {
    
    fetchUpdateOrderTask(task.tareaId, endOrder);
  }

  const handleMoveTask = (task, sourceId, destinationId) => {
    let source = listIds.find(x => x.id === parseInt(sourceId)).listName;
   
    let dest = listIds.find(x => x.id === parseInt(destinationId)).listName;
  
    fetchUpdateStatusTask(task.tareaId, dest, task.order);

  }

  const handleAddTask = async () =>{
    let index = projects.findIndex( x => x.proyectId ===project);
    
    const autor =  await fetchNameByPerfilId();


    const newTasktoAdd = {
         "tareaId":  uuidv4(), 
         "nombreTarea": "",
         "proyectoGuid" : projects[index].proyectId,
         "nombreProyecto" : projects[index].proyectName,
         "autor": autor.nombreCompleto,
         "autorGuid":autor.id,
         "estado":"new",
         "fechaFin":"",
         "descripcion": "",
         "listaIntegrantes": [ ]

        };
        setNewTask(newTask => ({...newTask,
          ...newTasktoAdd
        }))

        setShowNewTaskModal(true)
  }


  useEffect(()=> {
    if(currentRolByProject){
      fetchProyectTareaList()
    }
   
  },[currentRolByProject])

  useEffect(()=>{
    if(project){
      fetchRolByProjectId()
    }

  },[project])

  useEffect(()=>{
    if(projects.length>0 && projects !==null){
      setProject(projects[0].proyectId)

    }
  },[projects])

  useEffect(() => {
    fetchProyectList();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const fetchDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(`${apiEndpoint}/Tarea/EliminarTarea/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      fetchProyectTareaList(); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error en la solicitud, verifique los datos ingresados")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Datos no encontrados")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };

  const fetchUpdateOrderTask = async (id, newOrder) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(`${apiEndpoint}/Tarea/ActualizarOrdenTarea/${id}/${newOrder}`, null, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      fetchProyectTareaList(); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error en la solicitud, verifique los datos ingresados")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Datos no encontrados")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };

  const fetchUpdateStatusTask = async (id, status, newOrder) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(`${apiEndpoint}/Tarea/ActualizarEstadoTarea/${id}/${status}/${newOrder}`, null, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      fetchProyectTareaList(); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error en la solicitud, verifique los datos ingresados")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Datos no encontrados")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };

  const fetchUpdateInfoTask = async (id, obj) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(`${apiEndpoint}/Tarea/ActualizarTarea`, obj, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      fetchProyectTareaList(); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error en la solicitud, verifique los datos ingresados")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Datos no encontrados")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };

  const fetchAddNewTask = async (obj) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`${apiEndpoint}/Tarea/CrearTarea`, obj, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      fetchProyectTareaList(); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error en la solicitud, verifique los datos ingresados")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Datos no encontrados")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };

  const fetchProyectList = async () => {
    try {
      const token = localStorage.getItem('token');

      // Obtiene el userName almacenado en localStorage
    const perfilId = localStorage.getItem('perfilId');


      const response = await axios.get(`${apiEndpoint}/Proyecto/ProyectosPorPerfil/${perfilId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      setProjects(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error en la solicitud, verifique los datos ingresados")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Datos no encontrados")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };

  const fetchNameByPerfilId = async () => {
    try {
      const token = localStorage.getItem('token');

      // Obtiene el userName almacenado en localStorage
    const perfilId = localStorage.getItem('perfilId');

      const response = await axios.get(`${apiEndpoint}/Perfil/GetById?id=${perfilId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      return response.data; // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error en la solicitud, verifique los datos ingresados")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Datos no encontrados")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };

  const fetchRolByProjectId = async () => {
    try {
      const token = localStorage.getItem('token');

      // Obtiene el userName almacenado en localStorage
    const perfilId = localStorage.getItem('perfilId');
    const proyectId = project;


      const response = await axios.get(`${apiEndpoint}/Integrante/RolPorIntegrante?proyectoId=${proyectId}&perfilId=${perfilId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      setCurrentRoleByProject(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error en la solicitud, verifique los datos ingresados")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Datos no encontrados")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };

  const fetchProyectTareaList = async () => {
    try {
      const token = localStorage.getItem('token');

      // Obtiene el userName almacenado en localStorage
    const perfilId = localStorage.getItem('perfilId');
    const proyectId = project;
    const role = currentRolByProject.rol;

      const response = await axios.get(`${apiEndpoint}/Tarea/ObtenerTareasPorPerfilYProyecto/${perfilId}/${proyectId}/${role}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      setProjectInfo(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
      // setProject(projects[0].proyectId)
    } catch (error) {
      if(error.response.status === 401)
      {
        ErrorToast("Acceso no Autorizado")
      }else{
        if(error.response.status === 400){
          ErrorToast("Error en la solicitud, verifique los datos ingresados")
        }else if(error.response.status === 404){
          ErrorToast("Error interno, Datos no encontrados")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      } 
    }
  };



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
                            {projects.length > 0 ? items(projects) : ""}
                        </Select>
                      </FormControl>
                      </Grid>
                      <Grid className="gridButton py-2" xs={4}>
                      <ThemeProvider theme={theme}>
                        <Button className="newTask ms-0 my-2" variant="contained" color="primary" onClick={handleAddTask}> { mobile === false ? <> <AddIcon sx={{ color: grey[50] }}/> Nueva Tarea </> :  <AddIcon sx={{ color: grey[50] }}/>}</Button>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
          </Box>
        
            </div>
            
            <div>
             { mobile === false? <Taskboard projectAllInfo={projectInfo} data={dataAux} handleSave={(id, task) => handleSaveTask(id, task)} handleDelete={(id) => handleDeleteTask(id)}  handleReorder={(task, order)=> handleReorderTask(task,order)} handleMove={(task,sId, dId) => handleMoveTask(task,sId, dId)}/> : 
            <TaskboardMobile projectAllInfo={projectInfo} data={dataAux} handleSave={(id, task) => handleSaveTask(id, task)} handleDelete={(id) => handleDeleteTask(id)}  handleMove={(task,sId, dId) => handleMoveTask(task,sId, dId)}/> }
            </div>
   
            <ModalTask taskData={newTask} taskId={null} modalEditState={showNewTaskModal} action="new" handleShow={()=> handleShow()}  handleClose={()=> handleClose()} handleDelete={(id) => handleDeleteTask(id)} handleSave={(id, task) => handleSaveTask(id, task)} handleSaveNew={(task) => handleSaveNewTask(task)} allAllowedMembers={projectInfo.allProjectMembers} />
         </div>
     )
}

export default TasksContainerPage