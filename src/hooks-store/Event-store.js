import { initStore } from './Store';

const configureStore = () => {
    const actions = {
        ADD_EVENT : (curState, payload) => {
            const updatedEvents = [...curState.events];
            updatedEvents.push({
                title : payload.title,
                venue : payload.venue,
                description : payload.description,
                date : payload.date,
                startTime : payload.startTime,
                endTime : payload.endTime,
                eventId : payload.eventId,
                userId: payload.userId
            });
            return { events : updatedEvents };
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
                endTime : payload.endTime
            };
            return { events : updatedEvents };
        }
    };
    initStore(actions, {
      events: []
    });
  };
  
  export default configureStore;