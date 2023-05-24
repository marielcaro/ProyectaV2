import './calendarContainerPage.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';

const CalendarContainerPage = () => {
   const select = (info) => {
      alert('selected ' + info.start + ' to ' + info.end);
   }



   const eventObject = [
      { // this object will be "parsed" into an Event Object
        title: 'Congress Part 1', // a property!
        start: '2023-05-21T12:30:00', // a property!
        end: '2023-05-21T13:30:00' // a property! ** see important note below about 'end' **
      },
      { // this object will be "parsed" into an Event Object
         title: 'Videoconference 1', // a property!
         start: '2023-05-21T13:30:00', // a property!
         end: '2023-05-21T14:30:00' // a property! ** see important note below about 'end' **
       },
       { // this object will be "parsed" into an Event Object
         title: 'Classes ', // a property!
         start: '2023-05-21T18:30:00', // a property!
         end: '2023-05-21T19:30:00' // a property! ** see important note below about 'end' **
       },
       { // this object will be "parsed" into an Event Object
         title: 'Lunch', // a property!
         start: '2023-05-21T15:30:00', // a property!
         end: '2023-05-21T16:30:00' // a property! ** see important note below about 'end' **
       },
       { // this object will be "parsed" into an Event Object
         title: 'Publish Paper', // a property!
         start: '2023-05-21T08:30:00', // a property!
         end: '2023-05-21T10:30:00' // a property! ** see important note below about 'end' **
       },
      { // this object will be "parsed" into an Event Object
         title: 'Congress Part 2', // a property!
         start: '2023-05-22T12:30:00', // a property!
         end: '2023-05-22T13:30:00' // a property! ** see important note below about 'end' **
       },
       { // this object will be "parsed" into an Event Object
         title: 'Congress Part 1', // a property!
         start: '2023-05-31T12:30:00', // a property!
         end: '2023-05-31T13:30:00' // a property! ** see important note below about 'end' **
       },
       { // this object will be "parsed" into an Event Object
          title: 'Videoconference 1', // a property!
          start: '2023-05-31T13:30:00', // a property!
          end: '2023-05-31T14:30:00' // a property! ** see important note below about 'end' **
        },
        { // this object will be "parsed" into an Event Object
          title: 'Classes ', // a property!
          start: '2023-05-31T18:30:00', // a property!
          end: '2023-05-31T19:30:00' // a property! ** see important note below about 'end' **
        },
        { // this object will be "parsed" into an Event Object
          title: 'Lunch', // a property!
          start: '2023-05-31T15:30:00', // a property!
          end: '2023-05-31T16:30:00' // a property! ** see important note below about 'end' **
        },
        { // this object will be "parsed" into an Event Object
          title: 'Publish Paper', // a property!
          start: '2023-05-31T08:30:00', // a property!
          end: '2023-05-31T10:30:00' // a property! ** see important note below about 'end' **
        },
        { // this object will be "parsed" into an Event Object
         title: 'Congress Part 1', // a property!
         start: '2023-05-11T12:30:00', // a property!
         end: '2023-05-11T13:30:00' // a property! ** see important note below about 'end' **
       },
       { // this object will be "parsed" into an Event Object
          title: 'Videoconference 1', // a property!
          start: '2023-05-11T13:30:00', // a property!
          end: '2023-05-11T14:30:00' // a property! ** see important note below about 'end' **
        },
        { // this object will be "parsed" into an Event Object
          title: 'Classes ', // a property!
          start: '2023-05-11T18:30:00', // a property!
          end: '2023-05-11T19:30:00' // a property! ** see important note below about 'end' **
        },
        { // this object will be "parsed" into an Event Object
          title: 'Lunch', // a property!
          start: '2023-05-11T15:30:00', // a property!
          end: '2023-05-11T16:30:00' // a property! ** see important note below about 'end' **
        },
        { // this object will be "parsed" into an Event Object
          title: 'Publish Paper', // a property!
          start: '2023-05-11T08:30:00', // a property!
          end: '2023-05-11T10:30:00' // a property! ** see important note below about 'end' **
        },
    ]

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
      />
 </div>
 )
}

export default CalendarContainerPage