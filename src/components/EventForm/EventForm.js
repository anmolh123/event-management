import React, { useReducer, useCallback } from 'react';
import './eventForm.css'
import Card from '../UI/Card/Card';
import { useStore } from '../../hooks-store/Store';
import { useHistory } from "react-router-dom";

const eventReducer = (state,action)=>{

    switch(action.type){
        case 'ADD_TITLE' :
            state.title = action.title
            return {
                ...state
            }
        case 'ADD_VENUE':
            return {
                ...state,
                venue : action.venue
            }
        case 'ADD_DESCRIPTION':
            return {
                ...state,
                description : action.description
            }
        case 'ADD_DATE':
            return {
                ...state,
                date : action.date
            }
        case 'ADD_START_TIME':
            return {
                ...state,
                startTime : action.startTime
            }
        case 'ADD_END_TIME':
            return {
                ...state,
                endTime : action.endTime
            }
        default:
            return state;
    }

};

const EventForm = React.memo(props => {

    const history = useHistory();

    const [ eventState, dispatch ] = useStore();

    const [ eventElements, setEventElements ] = useReducer(eventReducer,{
                                                                            title : '',
                                                                            venue : '',
                                                                            description : '',
                                                                            date : '',
                                                                            startTime : '',
                                                                            endTime : '',
                                                                            userId : '',
                                                                            eventId : ''

                                                                        });

    const titleHandler = useCallback(event => {
        setEventElements({ type : 'ADD_TITLE', title : event.target.value});
        console.log(event.target.value);
    },[]);

    const venueHandler = useCallback(event => {
        setEventElements({ type : 'ADD_VENUE', venue : event.target.value});
        console.log(event.target.value);
    },[]);

    const descriptionHandler = useCallback(event => {
        setEventElements({ type : 'ADD_DESCRIPTION', description : event.target.value});
        console.log(event.target.value);
    },[]);

    const dateHandler = useCallback(event => {
        setEventElements({ type : 'ADD_DATE', date : event.target.value});
        console.log(event.target.value);
    },[]);

    const startTimeHandler = useCallback(event => {
        setEventElements({ type : 'ADD_START_TIME', startTime : event.target.value});
        console.log(event.target.value);
    },[]);

    const endTimeHandler = useCallback(event => {
        setEventElements({ type : 'ADD_END_TIME', endTime : event.target.value});
        console.log(event.target.value);
    },[]);

    const submitHandler = useCallback(event => {
        event.preventDefault();
        dispatch('ADD_EVENT', eventElements);
        alert('Event Added');
        history.push('/');
        
    },[eventElements,dispatch]);

    return(
        <div className="container">
            <Card>    
                <form>
                    <div className="row">
                        <div className="col-25">
                            <label for="title">Title</label>
                        </div>
                        <div className="col-75">
                            <input
                                type="text"
                                id="title"
                                value={eventElements.title}
                                onChange={titleHandler}
                            />
                        </div>    
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="venue">Venue</label>
                        </div>
                        <div className="col-75">
                            <input
                                type="text"
                                id="venue"
                                value={eventElements.venue}
                                onChange={venueHandler}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="description">Description</label>
                        </div>
                        <div className="col-75">
                            <textarea
                                type="text"
                                id="description"
                                value={eventElements.description}
                                onChange={descriptionHandler}
                            />
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-25">
                            <label for="date">Date </label>
                        </div>
                        <div className="col-75">   
                            <input
                                type="date"
                                id="date"
                                value={eventElements.date}
                                onChange={dateHandler}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="startTime">Start Time </label>
                        </div>
                        <div className="col-75">   
                            <input
                                type="time"
                                id="startTime"
                                value={eventElements.startTime}
                                onChange={startTimeHandler}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="endTime">End Time </label>
                        </div>
                        <div className="col-75">   
                            <input
                                type="time"
                                id="endTime"
                                value={eventElements.endTime}
                                onChange={endTimeHandler}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <button
                            className="button"
                            type='button'
                            onClick={submitHandler}
                        >
                            Submit
                        </button>
                    </div>  
                </form>
            </Card>
        </div>
    )

});

export default EventForm;