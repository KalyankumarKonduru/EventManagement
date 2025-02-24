// src/context/EventContext.js
import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (eventData) => {
    setEvents((prevEvents) => [...prevEvents, eventData]);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== id));
  };

  // New function: addAttendee to an event
  const addAttendee = (eventId, attendee) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            attendees: [...(event.attendees || []), attendee],
          };
        }
        return event;
      })
    );
  };

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent, addAttendee }}>
      {children}
    </EventContext.Provider>
  );
};
