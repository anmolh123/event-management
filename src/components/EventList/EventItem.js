import React, { useCallback, useState, useContext } from 'react';
import Card from '../UI/Card/Card';
import './eventItem.css';
import Modal from '../UI/Modal/Modal';
import { useHistory } from "react-router-dom";
import { UserLoginContext } from "../../context/UserLoginContext";
import { useToasts } from 'react-toast-notifications';
import { useStore } from '../../hooks-store/Store';

const EventItem = React.memo(props => {

  const history = useHistory();
  const [ show, setshow ] = useState(false);
  const { userId } = useContext(UserLoginContext);
  const { addToast, removeAllToasts } = useToasts();
  const [ eventState ] = useStore();

  const popDetail = useCallback(()=>{
    setshow(true);
  },[]);

  const closeModal = useCallback(()=>{
    setshow(false);
  },[]);

  const updateHandler = useCallback(()=>{
    history.replace('/updateEvent',props.detail);
  },[props.detail,history]);

  const isOptedHandler = useCallback(()=>{
    props.toggle(props.id);
    const message = props.optStatus  ? 'Opted Out' : 'Opted In';
    removeAllToasts();
    addToast(message,{
      appearance: 'info',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    })
    setshow(false);
  },[props,removeAllToasts,addToast])

  const deleteHandler = useCallback(()=>{
    props.deleteEvent(props.id);
    removeAllToasts();
    addToast("Event Deleted",{
      appearance: 'info',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    })
    setshow(false);
  },[props,removeAllToasts,addToast])

  let ModelContent = (
    <Modal show={show} handleClose={closeModal}>
      <p><i>Title:</i> <b>{props.title}</b></p>
      <p><i>Venue:</i> <b>{props.detail.venue}</b></p>
      <p><i>Date:</i> <b>{props.detail.date.split("-").reverse().join("-")}</b> </p>
      <p><i>Start Time:</i> <b>{props.detail.startTime}</b> </p> 
      <p><i>End Time:</i> <b>{props.detail.endTime}</b></p>
      <p><i>Description:</i> <b> {props.detail.description}</b></p>
      { userId === props.detail.userId && <button type="button" onClick={updateHandler}> Update </button>}
      { userId !== props.detail.userId && <button type="button" onClick={isOptedHandler}> { props.optStatus  ? 'Opt-out' : 'Opt-in'} </button>}
      {"  "}
      { userId === props.detail.userId && <button type="button" className="delete-button" onClick={deleteHandler}> Delete </button>}
    </Modal>
  );

  if(props.demand){
    
    ModelContent =(
      <Modal show={show} handleClose={closeModal}>
        <h2> Users Opted: {props.title}</h2>
        <ol style={{textAlign : 'left'}}>
          { props.usersMappings && 
            eventState.opted[props.detail.eventId] &&

            Object.keys(eventState.opted[props.detail.eventId]).map( userId =>( 
              <li key={userId}>
                  {props.usersMappings[userId]}
              </li>
          
          ))
          }
        </ol>
        <p>{" "}</p>
      </Modal>
    );

  }

  return (
    <div className="cardModal">
    <Card>
      <div className="event-item" onClick={popDetail}>
        <h2 className={userId !== props.detail.userId ? ( props.optStatus ? 'opt-yes' : 'opt-no') : ''}>{props.title}</h2>
        <p>{props.detail.date.split("-").reverse().join("-")}{" "} 
         (<i>Start Time:{props.detail.startTime}, End Time: {props.detail.endTime}</i> )</p>
      </div>
    </Card>
    {ModelContent}
    </div>   
  );
});

export default EventItem;
