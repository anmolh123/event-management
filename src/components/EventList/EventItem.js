import React, { useCallback, useState } from 'react';
import Card from '../UI/Card/Card';
import './eventItem.css'
import Modal from '../UI/Modal/Modal';
import { useHistory } from "react-router-dom";

const EventItem = React.memo(props => {

  const history = useHistory();
  const [ show, setshow ] = useState(false);

  const popDetail = useCallback(()=>{
    setshow(true);
  },[]);

  const closeModal = useCallback(()=>{
    setshow(false);
  },[]);

  const updateHandle = useCallback(()=>{
    console.log(props.detail);
    history.replace('/updateEvent',props.detail);
  },[props.detail,history]);

  return (
    <Card style={{ marginBottom: '1rem' }} >
      <div className="event-item" onClick={popDetail}>
        <p>Title - {props.title}</p>
      </div>
      <Modal show={show} handleClose={closeModal}>
          <p>Title - {props.title}</p>
          <p>Venue - {props.detail.venue}</p>
          <p>Description - {props.detail.description}</p>
          <p>Date - {props.detail.date} </p>
          <p>Start Time - {props.detail.startTime}</p> 
          <p>End Time - {props.detail.endTime}</p>
          <button type="button" onClick={updateHandle}> Update </button>
          {"  "}
        </Modal>
    </Card>
  );
});

export default EventItem;
