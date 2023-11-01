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
import { useDispatch } from 'react-redux'
import { projects, dashboard, tasks, calendar } from '../../../features/dashboard/dashboardAction.js'

const DashboardSideBar = () => {
const [dashImage, setDashImage] = useState(dashboardIcon);
const [selected, setSelected] = useState("dashboard");
const [menuDashboardItemStyle, setMenuDashboardItemStyle] = useState({backgroundColor: '#FFFFFF',  color: '#EB5401'})
const [labelDashboardItemStyle, setLabelDashboardItemStyle] = useState({fontWeight: 'normal'})


const [projectsImage, setProjectsImage] = useState(proyectos);
const [menuProjectsItemStyle, setMenuProjectsItemStyle] = useState()
const [labelProjectsItemStyle, setLabelProjectsItemStyle] = useState()


const [tasksImage, setTasksImage] = useState(tareas);
const [menuTaskItemStyle, setMenuTaskItemStyle] = useState()
const [labelTaskItemStyle, setLabelTaskItemStyle] = useState()

const [calendarImage, setCalendarImage] = useState(calendario);
const [menuCalendarItemStyle, setMenuCalendarItemStyle] = useState()
const [labelCalendarItemStyle, setLabelCalendarItemStyle] = useState()



const dispatch = useDispatch()

const handleHoverDashboard = () =>{
  
  setDashImage(dashboardIcon)
}

const handleLostFocusDashboard = () =>{
  if( selected !== "dashboard"){
  setDashImage(dashboardnormal)
  }
}

const handleHoverProyectos = () =>{
  setProjectsImage(proyectosFocus)
}

const handleLostFocusProyectos = () =>{
  if( selected !== "proyectos"){
  setProjectsImage(proyectos)
  }
}


const handleHoverTareas = () =>{
 
  setTasksImage(tareasFocus)
  
}

const handleLostFocusTareas = () =>{
  if( selected !== "tareas"){
  setTasksImage(tareas)
  }
}


const handleHoverCalendar = () =>{
 
  setCalendarImage(calendarioFocus)
  
}

const handleLostFocusCalendar = () =>{
  if( selected !== "calendario"){
  setCalendarImage(calendario)
  }
}

const handlerClickItem  = (item) => {
  switch (item) {
    case "dashboard":
      dispatch(dashboard())
      setMenuDashboardItemStyle({backgroundColor: '#FFFFFF',  color: '#EB5401'})
      setDashImage(dashboardIcon)
      setLabelDashboardItemStyle({fontWeight: 'bold'})
      setSelected("dashboard")

      setMenuProjectsItemStyle()
      setProjectsImage(proyectos)
      setLabelProjectsItemStyle()

      setMenuTaskItemStyle()
      setTasksImage(tareas)
      setLabelTaskItemStyle()

      setMenuCalendarItemStyle()
      setCalendarImage(calendario)
      setLabelCalendarItemStyle()
      break;
  
      case "proyectos":
        dispatch(projects())
        setMenuProjectsItemStyle({backgroundColor: '#FFFFFF',  color: '#EB5401'})
        setProjectsImage(proyectosFocus)
        setLabelProjectsItemStyle({fontWeight: 'bold'})
        setSelected("proyectos")

        setMenuDashboardItemStyle()
        setDashImage(dashboardnormal)
        setLabelDashboardItemStyle()

        setMenuTaskItemStyle()
        setTasksImage(tareas)
        setLabelTaskItemStyle()
  
        setMenuCalendarItemStyle()
        setCalendarImage(calendario)
        setLabelCalendarItemStyle()


        break;
  
        case "tareas":
          dispatch(tasks())
          setMenuTaskItemStyle({backgroundColor: '#FFFFFF',  color: '#EB5401'})
          setTasksImage(tareasFocus)
          setLabelTaskItemStyle({fontWeight: 'bold'})
          setSelected("tareas")

          setMenuDashboardItemStyle()
        setDashImage(dashboardnormal)
        setLabelDashboardItemStyle()

              setMenuProjectsItemStyle()
      setProjectsImage(proyectos)
      setLabelProjectsItemStyle()

        setMenuCalendarItemStyle()
        setCalendarImage(calendario)
        setLabelCalendarItemStyle()
        break;

          case "calendario":
            dispatch(calendar())
            setMenuCalendarItemStyle({backgroundColor: '#FFFFFF',  color: '#EB5401'})
            setCalendarImage(calendarioFocus)
            setLabelCalendarItemStyle({fontWeight: 'bold'})
            setSelected("calendario")

            setMenuDashboardItemStyle()
            setDashImage(dashboardnormal)
            setLabelDashboardItemStyle()

            setMenuProjectsItemStyle()
      setProjectsImage(proyectos)
      setLabelProjectsItemStyle()
    
            setMenuTaskItemStyle()
            setTasksImage(tareas)
            setLabelTaskItemStyle()
            break;
        
    default:
      break;
  }

}


    return(
<div className='sidebarContainer'style={{ display: 'flex', height: '100%' }}>
    <Sidebar  className= 'sidebar' breakPoint="lg"  backgroundColor= '#F6EBF9'>
    <Menu>
      <MenuItem className='menuItem' style={menuDashboardItemStyle} label="tablero" onClick={() => handlerClickItem("dashboard")} onMouseOver={() => handleHoverDashboard()} onMouseOut={() => handleLostFocusDashboard()}>
               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={dashImage} height="24" width="24" alt="tablero" />
                                        <label style={labelDashboardItemStyle} > 
                                          TABLERO
                                        </label>

                                    </Box>
    
      </MenuItem>
      <MenuItem className='menuItem' style={menuProjectsItemStyle} label="proyectos" onClick={() => handlerClickItem("proyectos")} onMouseOver={() => handleHoverProyectos()} onMouseOut={() => handleLostFocusProyectos()}> 
       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={projectsImage} height="24" width="24" alt="tablero" />
                                        <label  style={labelProjectsItemStyle}> 
                                          PROYECTOS
                                        </label>

                                    </Box>
     </MenuItem>
      <MenuItem className='menuItem' style={menuTaskItemStyle} label="tareas" onClick={() => handlerClickItem("tareas")} onMouseOver={() => handleHoverTareas()} onMouseOut={() => handleLostFocusTareas()} >  
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={tasksImage} height="24" width="24" alt="tablero" />
                                        <label  style={labelTaskItemStyle}> 
                                          TAREAS
                                        </label>

                                    </Box>
     </MenuItem>

     <MenuItem className='menuItem'  style={menuCalendarItemStyle} label="calendario" onClick={() => handlerClickItem("calendario")} onMouseOver={() => handleHoverCalendar()} onMouseOut={() => handleLostFocusCalendar()}>  
     <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <img className='icons' src={calendarImage} height="24" width="24" alt="tablero" />
                                        <label  style={labelCalendarItemStyle}> 
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