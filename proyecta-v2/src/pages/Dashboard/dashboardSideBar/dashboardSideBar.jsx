import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './dashboardSideBar.css'
import Box from '@mui/material/Box';

import dashboardIcon from '../../../assets/icons/dashboard.png'
import dashboardnormal from '../../../assets/icons/dashboardNormal.png'
import proyectos from '../../../assets/icons/proyectos.png'
import proyectosFocus from '../../../assets/icons/proyectosFocus.png'
import tareas from '../../../assets/icons/tareas.png'
import tareasFocus from '../../../assets/icons/tareasFocus.png'
import calendario from '../../../assets/icons/calendario.png'
import calendarioFocus from '../../../assets/icons/calendarFocus.png'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { projects, dashboard, tasks, calendar } from '../../../features/dashboard/dashboardAction.js'

const DashboardSideBar = () => {
const [dashImage, setDashImage] = useState(dashboardnormal);
const [projectsImage, setProjectsImage] = useState(proyectos);
const [tasksImage, setTasksImage] = useState(tareas);
const [calendarImage, setCalendarImage] = useState(calendario);


const dispatch = useDispatch()

const handleHoverDashboard = () =>{
  setDashImage(dashboardIcon)
}

const handleLostFocusDashboard = () =>{
  setDashImage(dashboardnormal)
}

const handleHoverProyectos = () =>{
  setProjectsImage(proyectosFocus)
}

const handleLostFocusProyectos = () =>{
  setProjectsImage(proyectos)
}


const handleHoverTareas = () =>{
  setTasksImage(tareasFocus)
}

const handleLostFocusTareas = () =>{
  setTasksImage(tareas)
}


const handleHoverCalendar = () =>{
  setCalendarImage(calendarioFocus)
}

const handleLostFocusCalendar = () =>{
  setCalendarImage(calendario)
}



    return(
<div className='sidebarContainer'style={{ display: 'flex', height: '100%' }}>
    <Sidebar  className= 'sidebar' breakPoint="lg"  backgroundColor= '#F6EBF9'>
    <Menu>
      <MenuItem className='menuItem' label="tablero" onClick={() => dispatch(dashboard())} onMouseOver={() => handleHoverDashboard()} onMouseOut={() => handleLostFocusDashboard()}>
               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={dashImage} height="24" width="24" alt="tablero" />
                                        <label> 
                                          TABLERO
                                        </label>

                                    </Box>
    
      </MenuItem>
      <MenuItem className='menuItem' label="proyectos" onClick={() => dispatch(projects())} onMouseOver={() => handleHoverProyectos()} onMouseOut={() => handleLostFocusProyectos()}> 
       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={projectsImage} height="24" width="24" alt="tablero" />
                                        <label> 
                                          PROYECTOS
                                        </label>

                                    </Box>
     </MenuItem>
      <MenuItem className='menuItem' label="tareas" onClick={() => dispatch(tasks())} onMouseOver={() => handleHoverTareas()} onMouseOut={() => handleLostFocusTareas()} >  
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={tasksImage} height="24" width="24" alt="tablero" />
                                        <label> 
                                          TAREAS
                                        </label>

                                    </Box>
     </MenuItem>

     <MenuItem className='menuItem' label="calendario" onClick={() => dispatch(calendar())} onMouseOver={() => handleHoverCalendar()} onMouseOut={() => handleLostFocusCalendar()}>  
     <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={calendarImage} height="24" width="24" alt="tablero" />
                                        <label> 
                                          CALENDARIO
                                        </label>

                                    </Box>
     </MenuItem>
    </Menu>
  </Sidebar>
  </div>
  
    )


}

export default DashboardSideBar;