import React, { useCallback, useState, useContext } from 'react';
import Card from '../UI/Card/Card';
import './eventItem.css'
import Modal from '../UI/Modal/Modal';
import { useHistory } from "react-router-dom";
import { UserLoginContext } from "../../context/UserLoginContext";

const EventItem = React.memo(props => {

  const history = useHistory();
  const [ show, setshow ] = useState(false);
  const { userId } = useContext(UserLoginContext);

  const popDetail = useCallback(()=>{
    setshow(true);
  },[]);

  const closeModal = useCallback(()=>{
    setshow(false);
  },[]);

  const updateHandle = useCallback(()=>{
    history.replace('/updateEvent',props.detail);
  },[props.detail,history]);

  const isOptedhandler = useCallback(()=>{
    props.toggle(props.id);
    const message = props.detail.isOpted ? 'Opted Out' : 'Opted In';
    alert(message);
    setshow(false);
  },[props])

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
          { userId === props.detail.userId && <button type="button" onClick={updateHandle}> Update </button>}
          { userId !== props.detail.userId && <button type="button" onClick={isOptedhandler}> { props.detail.isOpted ? 'Opt-out' : 'Opt-in'} </button>}
          {"  "}
        </Modal>
    </Card>
  );
});

export default EventItem;
