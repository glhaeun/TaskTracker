import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timegridPlugin from '@fullcalendar/timegrid';
import './Calendar.css';
import { createEventId, INITIAL_EVENTS } from './data';
import useCalendar from './store';
import ConfirmationModal from './confirmation';

const Calender = () => {
  const { currentEvents, setCurrentEvents } = useCalendar();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [eventToRemove, setEventToRemove] = useState(null);

  const handleEvents = async (events) => {
    await Promise.resolve(setCurrentEvents(events));
  };

  const handleDataSelect = (selectInfo) => {
    let title = prompt('Please enter a title for the event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    setEventToRemove(clickInfo.event);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (eventToRemove) {
      eventToRemove.remove();
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setEventToRemove(null);
    setShowConfirmation(false);
  };

  return (
    <div className="calender-container">
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timegridPlugin]}
          headerToolbar={{
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          allDaySlot={false}
          initialView="timeGridWeek"
          slotDuration={'01:00:00'}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          initialEvents={currentEvents}
          eventsSet={handleEvents}
          select={handleDataSelect}
          eventClick={handleEventClick}
        />
      </div>

      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this event?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Calender;
