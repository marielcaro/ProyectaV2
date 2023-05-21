import './calendarContainerPage.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const CalendarContainerPage = () => {
 return(
    <div className='caledarBoard'>
     <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        aspectRatio= "5"
        contentHeight= "650px"
        editable={true}
        selectable={true}

      />
 </div>
 )
}

export default CalendarContainerPage