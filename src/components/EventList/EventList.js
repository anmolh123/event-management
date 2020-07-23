import React from 'react';
import EventItem from './EventItem';
import { useStore } from '../../hooks-store/Store';
import './eventList.css';

const EventList = props => {
  const [ eventState ] = useStore();
  const events = eventState.events;

  return (
    <ul className="list">
      { events.map(event => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          detail={event}
        />
      ))}
    </ul>
  );
};

export default EventList;
