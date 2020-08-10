import React, { useContext, useCallback, useMemo, useState, useEffect, useRef } from 'react';
import EventItem from './EventItem';
import { useStore } from '../../hooks-store/Store';
import './eventList.css';
import { UserLoginContext } from "../../context/UserLoginContext";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';

const EventList = props => {
  const itemCount = 5;
  const [ eventState, dispatch ] = useStore();
  const { userId } = useContext(UserLoginContext);
  const [ events, setEvents ] = useState([]);
  const [ pageStartIndex, setPageStartIndex ] = useState(0);
  const [ pageEndIndex, setPageEndIndex ] = useState(itemCount);
  const nextButton = useRef(false);
  const previousButton = useRef(false);
  const history = useHistory();
  const { addToast, removeAllToasts } = useToasts();
  
  const alertMessage = useRef(history.location.state);
  const historyAction = useRef(history.action);

  useEffect(()=>{
    if(alertMessage.current && historyAction.current === 'REPLACE'){
      removeAllToasts();
      addToast('Event ' + alertMessage.current.type,{
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 2000,
      })
    }
  },[addToast,removeAllToasts])

  const filterEvents = useMemo(()=>{
    setPageStartIndex(0);
    setPageEndIndex(itemCount);
    switch(props.filter){
      case "my" :
        return eventState.events.filter(event => userId === event.userId);
      
      case "opted" :
        return eventState.events.filter(event => eventState.opted[event.eventId] ? eventState.opted[event.eventId][userId] : false );
      
      case "demand" :
        return eventState.events.filter(event => {        
            if(event.userId === userId){
              for( const obj in eventState.opted[event.eventId] ){
                return true;
              }
            }   
            return false;
          }); 

      default :
        return eventState.events;    
    }
  },[eventState,props.filter,userId])

  useEffect(()=>{
    let updatedEvents = filterEvents;
    let slicedEvents = updatedEvents.slice(pageStartIndex,pageEndIndex);
    setEvents(slicedEvents);
    if(pageStartIndex !== 0){
      previousButton.current = true;
    }else{
      previousButton.current = false;
    }
    if(pageEndIndex<filterEvents.length){
      nextButton.current = true;
    }else{
      nextButton.current = false;
    }
    
  },[pageStartIndex,pageEndIndex,filterEvents]);

  const previousPageHandler = useCallback(()=>{
    setPageStartIndex(pageStartIndex - itemCount);
    setPageEndIndex(pageEndIndex - itemCount);
  },[pageStartIndex,pageEndIndex]);

  const nextPageHandler = useCallback(()=>{
    setPageStartIndex(pageStartIndex + itemCount);
    setPageEndIndex(pageEndIndex + itemCount);
  },[pageStartIndex,pageEndIndex]);

  const ToggleOptStatus = useCallback((id)=>{
    dispatch('TOGGLE_OPT',{ eventId: id, userId : userId });
  },[dispatch, userId]);

  const deleteEvent = useCallback((id)=>{
    dispatch('DELETE_EVENT',id);
  },[dispatch]);
  
  return (
    <ul className="list">
      { events.length === 0 ? <h2>No Events Found!</h2>: null}
      { events.map(event => (
        <EventItem
          key={event.eventId}
          id={event.eventId}
          title={event.title}
          detail={event}
          optStatus ={eventState.opted[event.eventId] ? eventState.opted[event.eventId][userId] : null}
          toggle = {ToggleOptStatus}
          deleteEvent = {deleteEvent}
          demand = { props.filter==="demand"? true: false }
          usersMappings={props.usersMappings}
        />
      ))}
      <div style={{ textAlign : 'center'}}>
        {previousButton.current && <button type="button" onClick={previousPageHandler}>Previous</button> }
        {(previousButton.current || nextButton.current ) && " Page  "+ Math.ceil(pageStartIndex/5 + 1) + " of  " + Math.ceil(filterEvents.length/5) + "  "}
        {nextButton.current && <button type="button" onClick={nextPageHandler}>Next</button> }
      </div>
    </ul>
  );
};

export default EventList;
