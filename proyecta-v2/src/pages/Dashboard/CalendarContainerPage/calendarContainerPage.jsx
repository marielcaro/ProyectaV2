import './calendarContainerPage.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState, useRef } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import BasicTimePicker from '../../../components/TimePicker/TimePicker';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


const CalendarContainerPage = () => {
  const [dayRangeModal, setDayRangeModal] = useState(null);
  const [eventModal, setEventModal] = useState(null);
  const [selectedInfoDayRange, setSelectedInfoDayRange] = useState({ start:"", end:""}); //dia de inicio y fin
  const [selectedInfoEvent, setSelectedInfoEvent] = useState({ event: {title: ""}});
  const [eventSource, setEventSource] = useState(null);
  const [disabled,setDisabled] =useState(true);
  const [defaultDay, setDefaultDay] = useState(null);
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'};
  const randomColor= () => { return ("#"+((1<<24)*Math.random()|0).toString(16) + "")}
 const [verifyErrorTitle,setverifyErrorTitle] =useState(false) // 0:title, 1: startTime, 2: endTime, 3:projectName
 const [verifyStartTime,setverifyStartTime] =useState(false) 
 const [verifyEndTime, setverifyEndTime] =useState(false) 
 const [verifyProjectName,setverifyProjectName] =useState(false) 
  const members = ['Mariel Caro', 'Hernán Peinetti', 'Juan Manuel Romano', 'Micaela Chamut'];
const [selectedMembers, setSelectedMembers] = useState([]);
  const projects =['Proyecto 1','Proyecto 2','Proyecto 3','Proyecto 4'];
  const [project, setProject] = useState('');

  const eventObject = [
    { // this object will be "parsed" into an Event Object
      id: uuidv4(),
      title: 'Congress', // a property!
      description:'Descripcion 1',
      projectId: 2,
      projectName:'Proyecto 3',
      participants: ['Mariel Caro','Hernán Peinetti'],
      startRecur: '2023-08-18T09:00:00',
      endRecur: '2023-08-29T18:00:00',
      startTime: '2023-08-29T12:30:00', // a property!
      endTime: '2023-08-29T13:30:00', // a property! ** see important note below about 'end' **
      daysOfWeek: [ '1','2' ],
      display: 'block',
      color : randomColor(),
    }
  ]

  

  const [eventList, setEventList] = useState([]);

 const items = (elements) => {
      let listItem = [];

          for(var i=0;i<elements.length;i++){
            // push the component to elements!
            listItem.push( <MenuItem value={i}> {elements[i]} </MenuItem>);
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

  const handleSaveNewEvent = () => {
    
    
      setEventList([...eventList, newEvent]);
      setProject('')
      setSelectedMembers([])
      setverifyErrorTitle(true);
      setverifyStartTime(true);
      setverifyEndTime(true);
      setverifyProjectName(true);
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
    setEventSource('newEvent')
    
  };

 const eventClick = (info) => {
  console.log(info.event.id)
  setSelectedInfoEvent(info)
  
  const currentEvent = eventList.find(item => item.id === info.event.id);
  const dayRangeSelected = {start: new Date(currentEvent.startRecur), end: new Date(currentEvent.endRecur)}
  setSelectedInfoDayRange(dayRangeSelected)
  setProject(currentEvent.projectId)
  setSelectedMembers(currentEvent.participants)
  setNewEvent( newEvent => ({...newEvent,
    ...currentEvent
  }))
  setEventSource(() => "selectedEvent")
  
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
        setEventSource('')
      }else if(eventSource === 'selectedEvent'){
        dayRangeModal.show()
        setEventSource('')
      }
    }

   },[eventSource])


    useEffect(()=>{
      
      setNewEvent({
        ...newEvent,
        'projectId':project,
        'projectName' : projects[project]
       })

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
    setDayRangeModal(new bootstrap.Modal(document.getElementById('multiDayModal'), {
      keyboard: false
    }))

    setEventModal(new bootstrap.Modal(document.getElementById('eventModal'), {
      keyboard: false
    }))

    setEventList(...eventList, eventObject)
  }, []);


 return(
 
    <div className='calendarBoard'>
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
      />


{/* <!--MultiDay selected Modal --> */}
<div className="modal fade" id="multiDayModal" tabIndex="-1" aria-labelledby="multiDayModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="multiDayModalLabelId">Crear Nuevo Evento</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       <Stack spacing={4}  sx={{padding: '4px'}}>
             <TextField id="eventTitle" label="Título" variant="standard" name='title' error={verifyErrorTitle} value={newEvent.title} onChange={handleInputChange}/>

             <TextField id="dateRange" label="Fecha" variant="standard"  value={defaultDay}  InputProps={{
            readOnly: true,
          }}/>
          <Stack direction="row" spacing={2}>
              <BasicTimePicker error={verifyStartTime} label={"Hora de Inicio"} name='startTime' time={newEvent.startTime} action={eventSource} handleChange={(value,name) => handleInputTimeChange(value,name)} />
              <BasicTimePicker error={verifyEndTime} label={"Hora de Fin"} name='endTime' time={newEvent.endTime} action={eventSource} handleChange={(value,name) => handleInputTimeChange(value,name)} />
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
                      {items(projects)}
                      
                </Select>
        </FormControl>
          <Autocomplete
                    multiple
                    id="tags-standard"
                    options={members}
                    getOptionLabel={(option) => option}
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
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" className="btn btn-primary" disabled={disabled} data-bs-dismiss="modal" onClick={handleSaveNewEvent} >Guardar</button>
      </div>
    </div>
  </div>
</div>

{/* <!--MultiDay selected Modal --> */}
<div className="modal fade" id="eventModal" tabIndex="-1" aria-labelledby="exampledModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabeld">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       {'selected ' + selectedInfoEvent.event.title}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" >Save changes</button>
      </div>
    </div>
  </div>
</div>

</div>
 )
}

export default CalendarContainerPage