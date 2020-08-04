import { initStore } from './Store';
let eventObj = null;

const configureStore = () => {
    
    const actions = {

        ADD_EVENT : (curState, payload) => {
            const Event = [];
            Event.push({
                title : payload.title,
                venue : payload.venue,
                description : payload.description,
                date : payload.date,
                startTime : payload.startTime,
                endTime : payload.endTime,
                eventId : payload.eventId,
                userId: payload.userId
            });
            
            const updatedOptEvents = { ...curState.opted };
            updatedOptEvents[payload.eventId] = {};
            const newState = {events : [...Event, ...curState.events], opted : updatedOptEvents };
            localStorage.setItem('store',JSON.stringify(newState));
            
            return newState;

        },

        UPDATE_EVENT : (curState, payload) => {

            const eventIndex = curState.events.findIndex( e => e.eventId === payload.eventId);
            const updatedEvents = [...curState.events];
            updatedEvents[eventIndex] = {
                ...curState.events[eventIndex],
                title : payload.title,
                venue : payload.venue,
                description : payload.description,
                date : payload.date,
                startTime : payload.startTime,
                endTime : payload.endTime,
            };
            const newState = { ...curState, events : updatedEvents };
            localStorage.setItem('store',JSON.stringify(newState));
            return newState;

        },

        TOGGLE_OPT: (curState, { eventId, userId }) => {

            const updatedOptEvents = { ...curState.opted };
            const toggleOptStatus = updatedOptEvents[eventId][userId];
            updatedOptEvents[eventId][userId] = !toggleOptStatus;
            const newState = { ...curState, opted : updatedOptEvents };
            localStorage.setItem('store',JSON.stringify(newState));

            return newState;

          },

        DELETE_EVENT : (curState, eventId) => {

            const updatedEvents = curState.events.filter( e => e.eventId !== eventId);
            const { [eventId] : deletedObject , ...updatedOptEvents } = curState.opted;
            const newState = { events : updatedEvents, opted: {...updatedOptEvents} }
            localStorage.setItem('store',JSON.stringify(newState));
            
            return newState;

        }
    };

    eventObj = localStorage.getItem('store');
    if(eventObj !== null){
    eventObj = JSON.parse(eventObj);
    }
    else{
    eventObj = {
        events: [
                    {
                        date: "2020-07-28",
                        description: "the greatest circus ever",
                        endTime: "01:49",
                        eventId: 1,
                        startTime: "23:47",
                        title: "Circus",
                        userId: 333333,
                        venue: "circus central",
                    },
                    {
                        date: "2020-07-26",
                        description: "the greatest show ever",
                        endTime: "03:49",
                        eventId: 2,
                        startTime: "21:47",
                        title: "Dark Premier",
                        userId: 123456,
                        venue: "apex central",
                    },
                    {
                        date: "2020-07-24",
                        description: "the greatest gala ever",
                        endTime: "04:49",
                        eventId: 3,
                        startTime: "18:47",
                        title: "Gala",
                        userId: 333339,
                        venue: "gala central",
                    },
                    {
                        date: "2020-07-25",
                        description: "the greatest gazing ever",
                        endTime: "09:49",
                        eventId: 4,
                        startTime: "16:47",
                        title: "Sky gazing",
                        userId: 333339,
                        venue: "gaze central",
                    }
            ],
        opted :{
            1 : {},
            2 : {},
            3 : {},
            4 : {}
        }
        }
    }
    initStore(actions, eventObj );
  };
  
  export default configureStore;