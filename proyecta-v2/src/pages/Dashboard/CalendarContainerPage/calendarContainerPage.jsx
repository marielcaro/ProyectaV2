import './calendarContainerPage.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState, useRef } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import BasicTimePicker from '../../../components/TimePicker/TimePicker'
import BasicDateEventPicker from '../../../components/DateEventPicker/DateEventPicker';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import ErrorToast from '../../../components/Toast/ErrorToast';
import Loader from '../../../components/Loader/Loader';


const CalendarContainerPage = () => {
  const [loading, setLoading] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [dayRangeModal, setDayRangeModal] = useState(null);
  const [eventModal, setEventModal] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedInfoDayRange, setSelectedInfoDayRange] = useState({ start:"", end:""}); //dia de inicio y fin
  const [eventSource, setEventSource] = useState(null);
  const [disabled,setDisabled] =useState(true);
  const [defaultDay, setDefaultDay] = useState(null);
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'};
  const randomColor= () => { return ("#"+((1<<24)*Math.random()|0).toString(16) + "")} 
  const theme = createTheme({
    palette: {
      primary: {
        light: '#cce0ff',
        main: '#99c2ff',
        dark: ' #003d99',
        contrastText: '#ffffff',
      },
    },
  });
  const [verifyErrorTitle,setverifyErrorTitle] =useState(false) // 0:title, 1: startTime, 2: endTime, 3:projectName
  const [verifyStartTime,setverifyStartTime] =useState(false) 
  const [verifyEndTime, setverifyEndTime] =useState(false) 
  const [verifyProjectName,setverifyProjectName] =useState(false) 
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState('');
  const [eventList, setEventList] = useState([]);
  const [eventObject, setEventObject] = useState([])

  const [weekDays, setWeekDays] = useState(()=>[]);
  const [weekNumberDays, setWeekNumberDays] = useState(()=>[]);

  const handleSelectedWeekDays = (event, newWeekDays) => {
      setWeekDays(newWeekDays);
  };

const handleSaveDateEdition = ()=> {
  
    if(weekDays.length > 0){
      let numbers = []
      for(let i=0; i<weekDays.length; i++){
        
         switch (weekDays[i]) {
            case "L":
              numbers.push(1)
              break;
              case "M":
                numbers.push(2)
                break;
                case "Mi":
                  numbers.push(3)
                  break;
                  case "J":
                    numbers.push(4)
                    break;
                    case "V":
                      numbers.push(5)
                      break;
                      case "S":
                        numbers.push(6)
                      break;
                      case "D":
                        numbers.push(0)
                      break;
          }
        setWeekNumberDays(numbers.sort())
      }

    }else{
      setWeekNumberDays([])
    }
  }

 useEffect (()=> {
  if(weekNumberDays.length > 0){
    setNewEvent( newEvent => ({
      ...newEvent,
      ['daysOfWeek']: weekNumberDays || ''
    }))
  }else{
    if(newEvent['daysOfWeek']){
      let deletedWeekObject = newEvent ;
      delete deletedWeekObject['daysOfWeek'];
      setNewEvent( newEvent => ({
        ...newEvent,
        ...deletedWeekObject
      }))
    }

  }
 },[weekNumberDays])

 const items = (elements) => {
      let listItem = [];

          for(var i=0;i<elements.length;i++){
            // push the component to elements!
            listItem.push( <MenuItem value={elements[i].proyectId}> {elements[i].proyectName} </MenuItem>);
      }

      return listItem;
 }

 const [newEvent, setNewEvent] = useState({
        id: uuidv4(),
        title:'',
        description:'',
        projectId:'',
        projectName:'',
        participants: ['',''],
        startRecur: '',
        endRecur:'',
        startTime: null, 
        endTime: null,
        display: 'block',
        color : randomColor(),
      });


  const handleSelectChange = (event) => {
    
    setProject(event.target.value);
    
  };

  const handleCancelDeleteEvent = () => {
    setEventSource('selectedEvent')
    dayRangeModal.show()
  }

  const handleDeleteEvent =() =>{

    fetchDeleteEvent(newEvent)

       setProject('')
      setWeekDays([])
      setWeekNumberDays([])
      setSelectedMembers([])
      setverifyErrorTitle(true);
      setverifyStartTime(true);
      setverifyEndTime(true);
      setverifyProjectName(true);
      const emptyObject ={
        id: uuidv4(),
        title:'',
      description:'',
      projectId:'',
      projectName:'',
      participants: ['',''],
      startRecur: '',
      endRecur:'',
      startTime: null, 
      endTime: null,
      display: 'block',
      color : randomColor(),
    }
      setNewEvent( newEvent => ({...newEvent,
        ...emptyObject
      }))

       dayRangeModal.hide()

  }

  const handleSaveNewEvent = () => {
    
    if(eventSource=== "newEvent"){
      fetchAddNewEvent(newEvent)
  
    }else{
      if(eventSource==="selectedEvent"){
        fetchUpdateEvent(newEvent);
                
      }

    }
      setProject('')
      setWeekDays([])
      setWeekNumberDays([])
      setSelectedMembers([])
      setverifyErrorTitle(true);
      setverifyStartTime(true);
      setverifyEndTime(true);
      setverifyProjectName(true);
      const emptyObject ={
        id: uuidv4(),
        title:'',
      description:'',
      projectId:'',
      projectName:'',
      participants: ['',''],
      startRecur: '',
      endRecur:'',
      startTime: null, 
      endTime: null,
      display: 'block',
      color : randomColor(),
    }
      setNewEvent( newEvent => ({...newEvent,
        ...emptyObject
      }))

      dayRangeModal.hide()

  }

  const handleEditDateClick = () => {
    setWeekDays(weekDays)
      eventModal.show()
  }

  const handleInputChange = (event) => {
   setNewEvent({
       ...newEvent,
       [event.target.name] : event.target.value
      })
  }
            
  const handleMultiDayClick = (info ) => {
    info.end.setHours(info.end.getHours() -1)  
    setSelectedInfoDayRange(info)
    const emptyObject ={
      title:'',
      description:'',
      projectId:'',
      projectName:'',
      participants: ['',''],
      startRecur: '',
      endRecur:'',
      startTime: null, 
      endTime: null,
      display: 'block',
      color : randomColor(),
    }
    setNewEvent( newEvent => ({...newEvent,
      ...emptyObject
    }))
 
    setProject('')
    setSelectedMembers([])
    setWeekDays([])
    setModalTitle("Crear Nuevo Evento");
    setEventSource('newEvent')
    
  };

 const eventClick = (info) => {
      
      const currentEvent = eventList.find(item => item.id === info.event.id);
      const dayRangeSelected = {start: new Date(currentEvent.startRecur), end: new Date(currentEvent.endRecur)}
      setSelectedInfoDayRange(dayRangeSelected)
      setProject(currentEvent.projectId)
      setSelectedMembers(currentEvent.participants)
      if( currentEvent["daysOfWeek"] ){
          let daysWeek = []
          for(let i=0; i<currentEvent.daysOfWeek.length; i++){
            
            switch (currentEvent.daysOfWeek[i]) {
                case "1":
                  daysWeek.push("L")
                  break;
                  case "2":
                    daysWeek.push("M")
                    break;
                    case "3":
                      daysWeek.push("Mi")
                      break;
                      case "4":
                        daysWeek.push("J")
                        break;
                        case "5":
                          daysWeek.push("V")
                          break;
                          case "6":
                            daysWeek.push("S")
                          break;
                          case "0":
                            daysWeek.push("D")
                          break;
              }
            }
        setWeekDays(daysWeek)
      }
      
      setNewEvent( newEvent => ({...newEvent,
              ...currentEvent
            }))
      setModalTitle("Editar Evento");
      setEventSource(() => "selectedEvent")
    
 }

 const handleInputDateChange = (value, name) => {
  if(name === 'start' || name === 'end'){
    value = dayjs(value).toDate()
  }
  setSelectedInfoDayRange({
       ...selectedInfoDayRange,
       [name] : value
      })
}


  const handleInputTimeChange = (value, name) => {
    if(name === 'startTime' || name === 'endTime'){
      value = dayjs(value).format('HH:mm:ss')
    }
    setNewEvent({
         ...newEvent,
         [name] : value
        })
  }

    useEffect(()=>{
      if( eventModal && dayRangeModal){
        if( eventSource === 'newEvent'){
          dayRangeModal.show()
          
        }else if(eventSource === 'selectedEvent'){
            dayRangeModal.show()
            
        }
      }
    },[eventSource])


    useEffect(()=>{
      if(project){
        const a =  projects.find(x => x.proyectId === project).proyectName
        setNewEvent({
          ...newEvent,
          'projectId':project,
          'projectName' : projects.find(x => x.proyectId === project).proyectName
         })
         fetchAllAllowedMembers()

      }
     

   },[project])

 
   useEffect(()=>{
   
    setNewEvent({
      ...newEvent,
      'participants':selectedMembers,
     })

 },[selectedMembers])
   
 useEffect(()=>{

   if(newEvent.title && newEvent.startTime && newEvent.endTime && newEvent.projectName){
    setverifyErrorTitle(false);
    setverifyStartTime(false);
    setverifyEndTime(false);
    setverifyProjectName(false);
    setDisabled(false)
   }
   else{
    
      if (newEvent.title === null || newEvent.title.trim() === ""){
         setverifyErrorTitle(true);
      }else{
       
        setverifyErrorTitle(false);
      }
      
       if (newEvent.startTime === null || newEvent.startTime.trim() === ""){
    
        setverifyStartTime(true);
       }else{
        
        setverifyStartTime(false);
       }
       
       if (newEvent.endTime === null || newEvent.endTime.trim() === ""){
        
        setverifyEndTime(true);
       }else{
        
        setverifyEndTime(false);
       }

       if (newEvent.projectName === null || newEvent.projectName.trim() === ""){
     
        setverifyProjectName(true);
       }else{
        
        setverifyProjectName(false);
       }
    
    }
   
  
 },[newEvent])
                


   useEffect(() => {
    if(selectedInfoDayRange.start !== "" &&    selectedInfoDayRange.end!== "" ){
      let selectedDays = selectedInfoDayRange.start.getDay() !==  selectedInfoDayRange.end.getDay() ? selectedInfoDayRange.start.toLocaleDateString('es-ES',options) + " - " + selectedInfoDayRange.end.toLocaleDateString('es-ES',options) : selectedInfoDayRange.start.toLocaleDateString('es-ES',options);
      setDefaultDay(selectedDays)
      setNewEvent({
        ...newEvent,
        "startRecur" : dayjs(selectedInfoDayRange.start).format('YYYY-MM-DDTHH:mm:ss'),
        "endRecur" : dayjs(selectedInfoDayRange.end).format('YYYY-MM-DDTHH:mm:ss')
       })

    }

  }, [selectedInfoDayRange]);

  
   useEffect(() => {
    const modalElement = document.getElementById('multiDayModal');
    const modal = new bootstrap.Modal(modalElement, {
      keyboard: false
    });

    modalElement.addEventListener('hide.bs.modal', function (event) {
      // Aquí puedes llamar a la función que deseas ejecutar cuando se oculta el modal
      setEventSource('') 
    });

    setDayRangeModal(modal);

    setEventModal(new bootstrap.Modal(document.getElementById('eventModal'), {
      keyboard: false
    }))

    setEventList(...eventList, eventObject)

    fetchGetEventByPerfilId()
    fetchProyectList()
  }, []);

  const fetchAddNewEvent = async (obj) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token');
      const requestData=
      {  
          id: obj.id,
          titulo:obj.title,
          descripcion:obj.description,
          proyectoGuid:obj.projectId,
          nombreProyecto:obj.projectName,
          integrantes: obj.participants,
          fechaInicio: obj.startRecur,
          fechaFin:obj.endRecur,
          horaInicio: obj.startTime, 
          horaFin: obj.endTime,
          diasRecurrencia: obj.daysOfWeek && obj.daysOfWeek.length >0 ?  obj.daysOfWeek.map(num => num.toString()) : [""], 
          display: 'block',
          color : randomColor() 
        };
     

      const response = await axios.post(`${apiEndpoint}/Evento/CrearEvento`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      fetchGetEventByPerfilId(); // Asume que la respuesta contiene las opciones en un formato adecuado.
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
    } finally{
      setLoading(false)
    }
  };

  const fetchDeleteEvent = async (obj) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(`${apiEndpoint}/Evento/EliminarEvento/${obj.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      fetchGetEventByPerfilId(); // Asume que la respuesta contiene las opciones en un formato adecuado.
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


  const fetchUpdateEvent = async (obj) => {
    try {
      const token = localStorage.getItem('token');

      const requestData=
      {  
          id: obj.id,
          titulo:obj.title,
          descripcion:obj.description,
          proyectoGuid:obj.projectId,
          nombreProyecto:obj.projectName,
          integrantes: obj.participants,
          fechaInicio: obj.startRecur,
          fechaFin:obj.endRecur,
          horaInicio: obj.startTime, 
          horaFin: obj.endTime,
          diasRecurrencia: obj.daysOfWeek && obj.daysOfWeek.length >0 ?  obj.daysOfWeek.map(num => num.toString()) : [""], 
          display: 'block',
          color : randomColor() 
        };
     

      const response = await axios.put(`${apiEndpoint}/Evento/ActualizarEvento/${obj.id}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      fetchGetEventByPerfilId(); // Asume que la respuesta contiene las opciones en un formato adecuado.
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
          ErrorToast("Aún no tienes proyectos Asociados")
        }else if(error.response.status === 500){
          ErrorToast('Servidor inhabilitado, intente nuevamente más tarde. Estamos mejorando sus servicios.');
        }
      }  
    }
  };

  const fetchAllAllowedMembers = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Obtiene el userName almacenado en localStorage
    const proyectId = project;
  
  
      const response = await axios.get(`${apiEndpoint}/Integrante/IntegrantesPorProyecto/${proyectId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      });
      setMembers(response.data); // Asume que la respuesta contiene las opciones en un formato adecuado.
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

  const fetchGetEventByPerfilId= async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      const perfilId = localStorage.getItem('perfilId')

      const response = await axios.get(`${apiEndpoint}/Evento/ObtenerEventoPorPerfil/${perfilId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza YourAccessTokenHere por el token de autorización.
        },
      }); 

      const eventDataList = response.data.length > 0 ? response.data.map(item => {
        return {    
          id: item.id,
          title:item.titulo,
          description:item.descripcion,
          projectId:item.proyectoGuid,
          projectName:item.nombreProyecto,
          participants: item.integrantes,
          startRecur: item.fechaInicio,
          endRecur:item.fechaFin,
          daysOfWeek:item.diasRecurrencia && item.diasRecurrencia.length > 0 && item.diasRecurrencia[0]!=="" ? item.diasRecurrencia : "",
          startTime: item.horaInicio, 
          endTime: item.horaFin,
          display: 'block',
          color : randomColor() 
        };
      }) : [];

      setEventList(eventDataList); // Asume que la respuesta contiene las opciones en un formato adecuado.
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
    }finally{
      setLoading(false); // Oculta el Loader después de la petición (éxito o fallo)
  }
  };



 return(
 
    <div className='calendarBoard'>
     {loading && <Loader />} {/* Muestra el Loader cuando `loading` es true */}

     <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        locale = {esLocale}
        timeZone='local'
        initialView="dayGridMonth"
        height='100%'
        selectable={true}
        select = {handleMultiDayClick}
        events = {eventList}
        eventClick={eventClick}
        handleWindowResize={true}
        selectLongPressDelay={100}
      />


{/* <!--MultiDay selected Modal --> */}
<div className="modal fade" id="multiDayModal" tabIndex="-1" aria-labelledby="multiDayModalLabel" aria-hidden="true" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="multiDayModalLabelId">{modalTitle}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       <Stack spacing={4}  sx={{padding: '4px'}}>
             <TextField id="eventTitle" label="Título" variant="standard" name='title' error={verifyErrorTitle} value={newEvent.title} onChange={handleInputChange}/>
             <FormControl  variant="outlined" >
                  <InputLabel htmlFor="outlined-adornment-dateeditpicker">Fecha</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-date"
                    type='text'
                    readOnly={true} 
                    value={defaultDay}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={handleEditDateClick}
                        >
                          <EditIcon /> 
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
              </FormControl>
         
          <Stack direction="row" spacing={2}>
              <BasicTimePicker error={verifyStartTime} label={"Hora de Inicio"} name='startTime'  minTime={""} time={newEvent.startTime} action={eventSource} handleChange={(value,name) => handleInputTimeChange(value,name)} />
              <BasicTimePicker error={verifyEndTime} label={"Hora de Fin"} name='endTime'  minTime={newEvent.startTime}  time={newEvent.endTime} action={eventSource} handleChange={(value,name) => handleInputTimeChange(value,name)} />
          </Stack>   
          
          <TextField id="eventDescription" name='description' placeholder='Escribe una descripción aquí...' multiline rows={4} label="Descripción"  value={newEvent.description} onChange={handleInputChange}/>
          <FormControl error={verifyProjectName} fullWidth>
                <InputLabel id="projectLabel">Proyecto Vinculado</InputLabel>
                    <Select
                      labelId="project-select-Label"
                      id="project-select"
                      value={project}
                      name='projectName'
                      label="Proyecto Vinculado"
                      onChange={handleSelectChange}
                    >
                      {projects.length > 0 ? items(projects): ""}
                      
                </Select>
        </FormControl>
          <Autocomplete
                    multiple
                    id="tags-standard"
                    options={members}
                    getOptionLabel={(option) => option.nombreCompleto}
                    isOptionEqualToValue={(option, value) => option.nombreCompleto === value.nombreCompleto}
                    value={selectedMembers}
                    onChange={(event, newValue) => {
                      setSelectedMembers(newValue);
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Participantes"
                        placeholder="Añadir..."
                    />
                    )}
           />
           
        </Stack>
      </div>
      <div className="modal-footer ">
       {eventSource === "selectedEvent" ? <button type="button" class="deleteBtn p-2 btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" >  <DeleteIcon sx={{ color: grey[50] }}/> </button> : <></>}
      <div className='ms-auto p-2'>
        <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" className="saveBtn btn btn-primary" disabled={disabled}  onClick={handleSaveNewEvent} >Guardar</button>
        </div>
      </div>
    </div>
  </div>
</div>

{/* <!--Day Edit Modal --> */}
<div className="modal fade" id="eventModal" tabIndex="-1" aria-labelledby="exampledModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabeld">Seleccionar Fechas</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <Stack spacing={4}  sx={{padding: '4px'}}>
       <BasicDateEventPicker label="Fecha de Inicio" setSelectedInfoDayRange={setSelectedInfoDayRange} name='start'  minDate={""} date={selectedInfoDayRange.start ?selectedInfoDayRange.start : null } action={eventSource} handleChange={(value,name) => handleInputDateChange(value,name)} />
       <BasicDateEventPicker label="Fecha de Fin" setSelectedInfoDayRange={setSelectedInfoDayRange}  name='end'   minDate={selectedInfoDayRange.start} date={selectedInfoDayRange.end ? selectedInfoDayRange.end : null} action={eventSource} handleChange={(value,name) => handleInputDateChange(value,name)}/>
       <Stack spacing={2}  sx={{padding: '4px'}}>
       <label> Días de la Semana </label>
          <Stack
            direction="row"
            spacing={2}
          >
          <ThemeProvider theme={theme}>
          <ToggleButtonGroup
              className="toggleGroup"
              color="primary"
                value={weekDays}
                onChange={handleSelectedWeekDays}
                aria-label="week-day"
                
            >
              <ToggleButton className="toggleButtonCalendar" value="L" aria-label="lunes">
                 L
              </ToggleButton>
              <ToggleButton className="toggleButtonCalendar" value="M" aria-label="martes">
                 M
              </ToggleButton>
              <ToggleButton className="toggleButtonCalendar" value="Mi" aria-label="miercoles">
                 Mi
              </ToggleButton>
              <ToggleButton className="toggleButtonCalendar" value="J" aria-label="jueves" >
                J
              </ToggleButton>
              <ToggleButton className="toggleButtonCalendar" value="V" aria-label="viernes" >
                V
              </ToggleButton>
              <ToggleButton className="toggleButtonCalendar" value="S" aria-label="sabado" >
                S
              </ToggleButton>
              <ToggleButton className="toggleButtonCalendar" value="D" aria-label="domingo" >
                D
              </ToggleButton>
            </ToggleButtonGroup>
            </ThemeProvider>
          </Stack>
          </Stack>
       
       </Stack>
       </div>
      <div className="modal-footer">
       
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" className="saveBtn btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveDateEdition}>Guardar</button>
      </div>
    </div>
  </div>
</div>

{/* <!-- Delete Modal --> */}
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Eliminar Evento</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Está por eliminar un evento permanentamente. 
        ¿Desea continuar?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancelDeleteEvent}>Cancelar</button>
        <button type="button" class="btn btn-danger"   onClick={handleDeleteEvent} data-bs-dismiss="modal">Confirmar</button>
      </div>
    </div>
  </div>
</div>

</div>
 )
}

export default CalendarContainerPage