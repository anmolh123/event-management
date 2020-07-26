import React, { useContext, useCallback, useMemo, useState, useEffect } from 'react';
import EventItem from './EventItem';
import { useStore } from '../../hooks-store/Store';
import './eventList.css';
import { UserLoginContext } from "../../context/UserLoginContext";

const EventList = props => {
  const itemCount = 5;
  const [ eventState, dispatch ] = useStore();
  const { userId } = useContext(UserLoginContext);
  const [ events, setEvents ] = useState([]);
  const [ pageStartIndex, setPageStartIndex ] = useState(0);
  const [ pageEndIndex, setPageEndIndex ] = useState(itemCount);

  const filterEvents = useMemo(()=>{
    switch(props.filter){
      case "my" :
        return eventState.events.filter(e => userId === e.userId);
      case "opted" :
        return eventState.events.filter(e => e.isOpted);
      default :
        return eventState.events; 
    }
  },[eventState,props.filter,userId])

  useEffect(()=>{
    let updatedEvents = filterEvents;
    let slicedEvents = updatedEvents.slice(pageStartIndex,pageEndIndex);
    setEvents(slicedEvents);
  },[pageStartIndex,pageEndIndex,filterEvents])

  const previousButton = useMemo(()=>{
    if(pageStartIndex !== 0){
      return true;
    }
    return false;
  },[pageStartIndex]);

  const nextButton = useMemo(()=>{
    if(pageEndIndex<filterEvents.length){
      return true;
    }
    return false;
  },[pageEndIndex,filterEvents])

  const previousPageHandler = useCallback(()=>{
    setPageStartIndex(pageStartIndex - itemCount);
    setPageEndIndex(pageEndIndex - itemCount);
  },[pageStartIndex,pageEndIndex]);

  const nextPageHandler = useCallback(()=>{
    setPageStartIndex(pageStartIndex + itemCount);
    setPageEndIndex(pageEndIndex + itemCount);
  },[pageStartIndex,pageEndIndex]);

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
      {previousButton && <button type="button" onClick={previousPageHandler}>Previous</button> }
      {(previousButton || nextButton ) && " Page  "+ Math.ceil(pageStartIndex/5 + 1) + " of  " + Math.ceil(filterEvents.length/5) + "  "}
      {nextButton && <button type="button" onClick={nextPageHandler}>Next</button> }
    </ul>
  );
};

export default EventList;
