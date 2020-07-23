import { initStore } from './Store';

const configureStore = () => {
    const actions = {
        ADD_EVENT : (curState, payload) => {
            console.log('ADD');
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
            console.log("upadte ",updatedEvents);
            return { events : updatedEvents };
        }
    };
    initStore(actions, {
      events: []
    });
  };
  
  export default configureStore;