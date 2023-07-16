import './calendarContainerPage.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState, useRef } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';



const CalendarContainerPage = () => {
  const [myModal, setMyModal] = useState(null);
  const [selectedInfoDay, setSelectedInfoDay] = useState({dateStr:"", start:"", end:""});
  const [actionName, setActionName] = useState("dayClick")

    const handleDayClick = (info ) => {
   setSelectedInfoDay(info)
       myModal.show()

    };
  
    
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

    console.log(eventObject);

   const eventClick = (info) => {
      alert('Event: ' + info.event.title)
   }

   useEffect(() => {
    setMyModal(new bootstrap.Modal(document.getElementById('dayModal'), {
      keyboard: false
    }))
  }, []);
 return(
 
    <div className='calendarBoard'>
     <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
       locale = {esLocale}
       timeZone='locale'
        initialView="dayGridMonth"
        height='100%'
        selectable={true}
        selected = {handleDayClick}
      dateClick = {handleDayClick}
      events = {eventObject}
      eventClick={eventClick}
      handleWindowResize={true}
      />



{/* <!-- Modal --> */}
<div className="modal fade" id="dayModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       {'selected ' + selectedInfoDay.dateStr}
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>
 )
}

export default CalendarContainerPage