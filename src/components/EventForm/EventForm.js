import React, { useReducer, useCallback, useEffect, useContext, useRef } from 'react';
import './eventForm.css'
import Card from '../UI/Card/Card';
import { useStore } from '../../hooks-store/Store';
import { useHistory } from 'react-router-dom';
import { UserLoginContext } from '../../context/UserLoginContext';
import { useToasts } from 'react-toast-notifications';

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

    const { addToast, removeAllToasts } = useToasts();
    const history = useHistory();
    const dispatch = useStore()[1];
    const { userId } = useContext(UserLoginContext);
    const [ eventElements, setEventElements ] = useReducer(eventReducer,{
                                                                            title : '',
                                                                            venue : '',
                                                                            description : '',
                                                                            date : '',
                                                                            startTime : '',
                                                                            endTime : '',
                                                                            userId : '',
                                                                            eventId : '',
                                                                        });
                                                                    
    const previousEventState = useRef(history.location.state);

    useEffect(()=>{
        if(previousEventState.current){
            setEventElements({ type : 'PEVIOUS_EVENT_VALUES', payload : previousEventState.current});
        }else{
            const eventId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
            setEventElements({ type : 'SET_ID', userId : userId, eventId : eventId})
        }
    },[userId]);

    const titleHandler = useCallback(event => {
        if(event.target.value.length < 31 )
        setEventElements({ type : 'ADD_TITLE', title : event.target.value});
    },[]);

    const venueHandler = useCallback(event => {
        setEventElements({ type : 'ADD_VENUE', venue : event.target.value});
    },[]);

    const descriptionHandler = useCallback(event => {
        setEventElements({ type : 'ADD_DESCRIPTION', description : event.target.value});
    },[]);

    const dateHandler = useCallback(event => {
        setEventElements({ type : 'ADD_DATE', date : event.target.value});
    },[]);

    const startTimeHandler = useCallback(event => {
        setEventElements({ type : 'ADD_START_TIME', startTime : event.target.value});
    },[]);

    const endTimeHandler = useCallback(event => {
        setEventElements({ type : 'ADD_END_TIME', endTime : event.target.value});
    },[]);

    const submitHandler = useCallback(event => {
        event.preventDefault();
        
        const start = eventElements.startTime.split(':');
        const end = eventElements.endTime.split(':');

        if( (+start[0])*60 + (+start[1]) < (+end[0])*60 + (+end[1]) ){
            
            if(!history.location.state){
                dispatch('ADD_EVENT', eventElements);
                history.replace('/',{ type: 'created'});
            }
            else{
                dispatch('UPDATE_EVENT', eventElements);
                history.replace('/',{ type : 'updated'});
            }
            
        }else{
            removeAllToasts();
            addToast(' Start Time should be less than End Time',{
                appearance: 'info',
                autoDismiss: true,
                autoDismissTimeout: 2000,
            })
        }

    },[eventElements,dispatch,history,removeAllToasts,addToast]);

    return(
        <div className="container">
            <Card>    
                <form>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="title">Title</label>
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
                            <label htmlFor="venue">Venue</label>
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
                            <label htmlFor="description">Description</label>
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
                            <label htmlFor="date">Date </label>
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
                            <label htmlFor="startTime">Start Time </label>
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
                            <label htmlFor="endTime">End Time </label>
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