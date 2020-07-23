import React, { useReducer, useCallback, useEffect, useContext } from 'react';
import './eventForm.css'
import Card from '../UI/Card/Card';
import { useStore } from '../../hooks-store/Store';
import { useHistory } from 'react-router-dom';
import { UserLoginContext } from '../../context/UserLoginContext';

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
        case 'PEVIOUS_EVENT_VALUES':
            const payload = action.payload;
            return {
                ...state,
                title : payload.title,
                venue : payload.venue,
                description : payload.description,
                date : payload.date,
                startTime : payload.startTime,
                endTime : payload.endTime,
                userId : payload.userId,
                eventId : payload.eventId
            }
        case 'SET_ID':
            console.log('id',action.eventId)
            return {
                ...state,
                userId : action.userId,
                eventId : action.eventId
            }
        default:
            return state;
    }

};

const EventForm = React.memo(props => {

    const history = useHistory();
    const [ eventState, dispatch ] = useStore();
    const { userId } = useContext(UserLoginContext);
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

    useEffect(()=>{
        if(history.location.state){
            setEventElements({ type : 'PEVIOUS_EVENT_VALUES', payload : history.location.state});
        }else{
            const eventSize = eventState.events.length + 1;
            setEventElements({ type : 'SET_ID', userId : userId, eventId : eventSize})
        }
    },[history.location.state,userId,eventState.events.length]);

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
        if(!history.location.state){
            console.log("events", eventElements.userId, eventElements.eventId);
            dispatch('ADD_EVENT', eventElements);
            alert('Event Added');
            history.replace('/');
        }
        else{
            dispatch('UPDATE_EVENT', eventElements);
            alert('Event Updated');
            history.replace('/');
        }
    },[eventElements,dispatch,history]);

    return(
        <div className="container">
            <Card>    
                <form>
                    <div className="row">
                        <div className="col-25">
                            <label for="title">Title</label>
                        </div>
                        <div className="col-45">
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
                        <div className="col-45">
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
                        <div className="col-45">
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
                        <div className="col-30">   
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
                        <div className="col-30">   
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
                        <div className="col-30">   
                            <input
                                type="time"
                                id="endTime"
                                value={eventElements.endTime}
                                onChange={endTimeHandler}
                            />
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <button
                            className="button"
                            type='button'
                            onClick={submitHandler}
                        >
                            { history.location.state && 'Modify' }
                            { !history.location.state && 'Create' }
                        </button>
                    </div>  
                </form>
            </Card>
        </div>
    )

});

export default EventForm;