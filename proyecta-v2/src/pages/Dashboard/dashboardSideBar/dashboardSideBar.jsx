import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './dashboardSideBar.css'
import Box from '@mui/material/Box';

import dashboard from '../../../assets/icons/dashboard.png'
import dashboardnormal from '../../../assets/icons/dashboardNormal.png'
import proyectos from '../../../assets/icons/proyectos.png'
import proyectosFocus from '../../../assets/icons/proyectosFocus.png'
import tareas from '../../../assets/icons/tareas.png'
import tareasFocus from '../../../assets/icons/tareasFocus.png'
import calendario from '../../../assets/icons/calendario.png'
import calendarioFocus from '../../../assets/icons/calendarFocus.png'
import { useState } from 'react';

const DashboardSideBar = () => {
const [dashImage, setDashImage] = useState(dashboardnormal);
const [projectsImage, setProjectsImage] = useState(proyectos);
const [tasksImage, setTasksImage] = useState(tareas);
const [calendarImage, setCalendarImage] = useState(calendario);


const handleHoverDashboard = () =>{
  setDashImage(dashboard)
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
      <MenuItem className='menuItem' label="tablero" onMouseOver={() => handleHoverDashboard()} onMouseOut={() => handleLostFocusDashboard()}>
               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={dashImage} height="24" width="24" alt="tablero" />
                                        <label> 
                                          TABLERO
                                        </label>

                                    </Box>
    
      </MenuItem>
      <MenuItem className='menuItem' label="proyectos" onMouseOver={() => handleHoverProyectos()} onMouseOut={() => handleLostFocusProyectos()}> 
       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={projectsImage} height="24" width="24" alt="tablero" />
                                        <label> 
                                          PROYECTOS
                                        </label>

                                    </Box>
     </MenuItem>
      <MenuItem className='menuItem' label="tareas" onMouseOver={() => handleHoverTareas()} onMouseOut={() => handleLostFocusTareas()} >  
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={tasksImage} height="24" width="24" alt="tablero" />
                                        <label> 
                                          TAREAS
                                        </label>

                                    </Box>
     </MenuItem>

     <MenuItem className='menuItem' label="calendario" onMouseOver={() => handleHoverCalendar()} onMouseOut={() => handleLostFocusCalendar()}>  
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