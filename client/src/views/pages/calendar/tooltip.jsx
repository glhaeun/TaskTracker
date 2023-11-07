import React from 'react';

const EventTooltip = ({ event }) => {
    console.log("hi");
    console.log("hello");

  if (event && event.start && event.end) {
    return (
      <div className="event-tooltip">
        <strong>{event.title}</strong>
        <p>Start: {event.start.toLocaleString()}</p>
        <p>End: {event.end.toLocaleString()}</p>
      </div>
    );
  } else {
    return null; // Return null or a message when event is null or lacks necessary properties
  }
};

export default EventTooltip;
