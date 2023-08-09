import './calendarContainerPage.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState, useRef } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import BasicTimePicker from '../../../components/TimePicker/TimePicker';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


const CalendarContainerPage = () => {
  const [dayRangeModal, setDayRangeModal] = useState(null);
  const [eventModal, setEventModal] = useState(null);
  const [selectedInfoDayRange, setSelectedInfoDayRange] = useState({ start:"", end:""});
  const [selectedInfoEvent, setSelectedInfoEvent] = useState({ event: {title: ""}});
  const [defaultDay, setDefaultDay] = useState(null);
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'};
 
    
  const randomColor= "#"+((1<<24)*Math.random()|0).toString(16) + "";

 
  const eventObject = [
              { // this object will be "parsed" into an Event Object
                groupId: 'blueEvents',
                title: 'Congress', // a property!
                start: '2023-06-21',
                end:'2023-06-22',
                startRecur: '2023-06-18T09:00:00',
                endRecur: '2023-06-29T18:00:00',
                startTime: '12:30:00', // a property!
                endTime: '13:30:00', // a property! ** see important note below about 'end' **
                daysOfWeek: [ '1','2' ],
                display: 'block',
                color : randomColor,
              }
            ]
          
    const handleMultiDayClick = (info ) => {
      console.log(info)
      info.end.setHours(info.end.getHours() -1)  
      setSelectedInfoDayRange(info)
     
      dayRangeModal.show()
    };

   const eventClick = (info) => {
    setSelectedInfoEvent(info)
    eventModal.show()
   }

   useEffect(() => {
    if(selectedInfoDayRange.start !== "" &&    selectedInfoDayRange.end!== "" ){
      let selectedDays = selectedInfoDayRange.start.getDay() !==  selectedInfoDayRange.end.getDay() ? selectedInfoDayRange.start.toLocaleDateString('es-ES',options) + " - " + selectedInfoDayRange.end.toLocaleDateString('es-ES',options) : selectedInfoDayRange.start.toLocaleDateString('es-ES',options);
      setDefaultDay(selectedDays)
    }
  }, [selectedInfoDayRange]);
  
   useEffect(() => {
    setDayRangeModal(new bootstrap.Modal(document.getElementById('multiDayModal'), {
      keyboard: false
    }))

    setEventModal(new bootstrap.Modal(document.getElementById('eventModal'), {
      keyboard: false
    }))
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
      events = {eventObject}
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
             <TextField id="dateRange" label="Fecha" variant="standard" value={defaultDay}  InputProps={{
            readOnly: true,
          }}/>
             <BasicTimePicker />
          </Stack>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" className="btn btn-primary">Guardar</button>
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
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

</div>
 )
}

export default CalendarContainerPage