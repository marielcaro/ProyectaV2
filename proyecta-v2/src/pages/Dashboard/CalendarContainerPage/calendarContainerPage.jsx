import './calendarContainerPage.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState } from 'react';

const CalendarContainerPage = () => {
   const select = (info) => {
      alert('selected ' + info.start + ' to ' + info.end);
   }

   
  const randomColor= "#"+((1<<24)*Math.random()|0).toString(16) + "";

 
  const eventObject = [
              { // this object will be "parsed" into an Event Object
                groupId: 'blueEvents',
                title: 'Congress', // a property!
                startRecur: '2023-05-21',
                endRecur:'2023-05-22T13:30:00',
                startTime: '12:30:00', // a property!
                endTime: '13:30:00', // a property! ** see important note below about 'end' **
                daysOfWeek: [ '0','1' ],
                display: 'block',
                color : randomColor,
              }
            ]

    console.log(eventObject);

   const eventClick = (info) => {
      alert('Event: ' + info.event.title)
   }
 return(
    <div className='calendarBoard'>
     <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        locale = {esLocale}
        initialView="dayGridMonth"
        height='100%'
        selectable={true}
      select = {select}
      events = {eventObject}
      eventClick={eventClick}
      handleWindowResize={true}
      />
 </div>
 )
}

export default CalendarContainerPage