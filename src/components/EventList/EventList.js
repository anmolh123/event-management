import React, { useContext, useCallback } from 'react';
import EventItem from './EventItem';
import { useStore } from '../../hooks-store/Store';
import './eventList.css';
import { UserLoginContext } from "../../context/UserLoginContext";

const EventList = props => {
  const [ eventState, dispatch ] = useStore();
  const { userId } = useContext(UserLoginContext);
  const events = props.filter === "my" ? eventState.events.filter(e => userId === e.userId )
                              : props.filter === "opted" ? eventState.events.filter(e => e.isOpted ): eventState.events;

  const ToggleOptStatus = useCallback((id)=>{
    dispatch('TOGGLE_OPT',id);
  },[dispatch]);
  
  return (
    <ul className="list">
      { events.map(event => (
        <EventItem
          key={event.eventId}
          id={event.eventId}
          title={event.title}
          detail={event}
          toggle = {ToggleOptStatus}
        />
      ))}
    </ul>
  );
};

export default EventList;
