import React, { useState ,useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timegridPlugin from '@fullcalendar/timegrid';
import './Calendar.css';
import { createEventId, INITIAL_EVENTS } from './data';
import ConfirmationModal from './confirmation';
import listPlugin from '@fullcalendar/list'; // Import the listPlugin
import EditModal from './add';
import ViewModal from './view';
import calendarApi from '../../../api/calendarApi'

const Calender = () => {
  const [ currentEvents, setCurrentEvents ] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [eventToRemove, setEventToRemove] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewDrawer, setViewDrawer] = useState(false);

  
  const fetchCalendarData = async () => {
    try {
      const calendarData = await calendarApi.getAll();
      setCurrentEvents(calendarData);
      console.log(calendarData)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=> {
    
    fetchCalendarData()
  }, [])


  const [singleEvent, setSingleEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // const handleEvents = async (events) => {
  //   await Promise.resolve(setCurrentEvents(events));
  // };



 

  const handleDataSelect = (selectInfo) => {
    // let title = prompt('Please enter a title for the event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.start,
    //     end: selectInfo.end,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event.extendedProps.description)
    if (clickInfo.event.allDay === false) {
      const eventData = {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        start: clickInfo.event.start,
        end: clickInfo.event.end,
        color: clickInfo.event.backgroundColor,
        allDay: clickInfo.event.allDay,
        description: clickInfo.event.extendedProps.description,
      };
  
      setShowEditModal(true);
      setSingleEvent(eventData);
    } else {
      const start = new Date(clickInfo.event.start);
      const end = new Date(clickInfo.event.end);
    
      if (clickInfo.event.allDay && start.getDate() === end.getDate()) {
        end.setDate(start.getDate() + 1);
      }
    
      const eventData = {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        start: clickInfo.event.start,
        end: end,
        color: clickInfo.event.backgroundColor,
        allDay: clickInfo.event.allDay,
        description: clickInfo.event.extendedProps.description,
      };
  
      setShowEditModal(true);
      setSingleEvent(eventData);
    }
  };

  const handleEventDrop = async(dropInfo) => {
    console.log(dropInfo.event)
    const event = {
      id: dropInfo.event.id,
      title: dropInfo.event.title,
      start: dropInfo.event.start,
      end: dropInfo.event.end,
      color: dropInfo.event.backgroundColor,
      description: dropInfo.event.extendedProps.description
    };

    const eventId = dropInfo.event.id
    try {
      const result = await calendarApi.update(eventId, {event})
      console.log(result)
      fetchCalendarData();
    } catch(error) {
      console.log(error)
    }
  }
  

  const handleEventResize = async (resizeInfo) => {
    const eventId = resizeInfo.event.id
    const event = {
      id: resizeInfo.event.id,
      start: resizeInfo.event.start,
      end: resizeInfo.event.end,
    };

    try {
      const result = await calendarApi.update(eventId, { event });
      console.log(result);
      fetchCalendarData(); 
    } catch (error) {
      console.error(error);
    }
  };


  const handleAddEvent = async (event) => {
    try {
      const result = await calendarApi.create({event})
      console.log(result)
      setShowEditModal(false);
      fetchCalendarData();
    } catch (err) {
      console.log(err)
    }
  };

  const handleEditEvent = async (eventId, event) => {
    try {
      const result = await calendarApi.update(eventId, {event})
      console.log(result)
      setShowEditModal(false);
      fetchCalendarData();
    } catch(error) {
      console.log(error)
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const result = await calendarApi.delete(eventId)
      console.log(result)
      setShowEditModal(false);
      fetchCalendarData();
    } catch(error) {
      console.log(error)
    }
  }
  const handleDateClick = (dateClickInfo) => {
    setSelectedDate(dateClickInfo.dateStr);
    console.log(dateClickInfo)
    setViewDrawer(true);
    
  };

  const handleCloseDrawer = () => {
    setSelectedDate(null); 
    setViewDrawer(false);
  };

  return (
    <div className="calender-container">
      <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timegridPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        allDaySlot={true}
        initialView="dayGridMonth"
        slotDuration={'01:00:00'}
        editable={true}
        eventResizableFromStart={true}
        eventDurationEditable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        nowIndicator={true}
        events={currentEvents}
        select={handleDataSelect}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
      />
      </div>

      {/* {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this event?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          open={showConfirmation}
        />
      )} */}

    {showEditModal && (
        <EditModal type={"edit"} open={showEditModal} onSave={handleEditEvent} onCancel={() => setShowEditModal(false)} event={singleEvent} onDelete={handleDelete}/>
      )}

      {showViewDrawer && (
        <ViewModal open={showViewDrawer} onClose={handleCloseDrawer} date={selectedDate} edit={showEditModal} onSave={handleAddEvent} onDelete={handleDelete}/>
        )}
    </div>
  );
};

export default Calender;
