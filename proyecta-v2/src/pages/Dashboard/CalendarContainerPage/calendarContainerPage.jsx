import './calendarContainerPage.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';

const CalendarContainerPage = () => {
   const select = (info) => {
      alert('selected ' + info.startStr + ' to ' + info.endStr);
   }

   const eventObject = [
      { // this object will be "parsed" into an Event Object
        title: 'The Title', // a property!
        start: '2023-05-21', // a property!
        end: '2023-05-23' // a property! ** see important note below about 'end' **
      }
    ]

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
      />
 </div>
 )
}

export default CalendarContainerPage