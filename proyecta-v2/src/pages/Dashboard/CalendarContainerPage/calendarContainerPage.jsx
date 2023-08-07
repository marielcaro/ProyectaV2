import './calendarContainerPage.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState, useRef } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';



const CalendarContainerPage = () => {
  const [dayModal, setDayModal] = useState(null);
  const [dayRangeModal, setDayRangeModal] = useState(null);
  const [eventModal, setEventModal] = useState(null);
  const [selectedInfoDay, setSelectedInfoDay] = useState({dateStr:""});
  const [selectedInfoDayRange, setSelectedInfoDayRange] = useState({ start:"", end:""});
  const [selectedInfoEvent, setSelectedInfoEvent] = useState({ event: {title: ""}});
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
 
    
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

    const handleDayClick = (info ) => {
      setSelectedInfoDay(info)
      dayModal.show()
    };
           
    const handleMultiDayClick = (info ) => {
      console.log(info)
      setSelectedInfoDayRange(info)
      dayRangeModal.show()
    };

   const eventClick = (info) => {
    setSelectedInfoEvent(info)
    eventModal.show()
   }

   useEffect(() => {
    setDayModal(new bootstrap.Modal(document.getElementById('dayModal'), {
      keyboard: false
    }))

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
        dateClick = {handleDayClick}
        select = {handleMultiDayClick}
      events = {eventObject}
      eventClick={eventClick}
      handleWindowResize={true}
      />



{/* <!-- Day Modal --> */}
<div className="modal fade" id="dayModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       {'selected ' + selectedInfoDay.dateStr}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


{/* <!--MultiDay selected Modal --> */}
<div className="modal fade" id="multiDayModal" tabIndex="-1" aria-labelledby="exampledModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabeld">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       {selectedInfoDayRange.start !== "" &&    selectedInfoDayRange.end!== "" ? 'selected ' + selectedInfoDayRange.start.toLocaleDateString('es-ES',options) + " - to: " + selectedInfoDayRange.end :""}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
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