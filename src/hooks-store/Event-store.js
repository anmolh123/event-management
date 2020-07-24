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
                isOpted : payload.isOpted,
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
        },
        TOGGLE_OPT: (curState, eventId) => {
            const eventIndex = curState.events.findIndex( e => e.eventId === eventId);
            const newOptStatus = !curState.events[eventIndex].isOpted;
            const updatedEvents = [...curState.events];
            updatedEvents[eventIndex] = {
              ...curState.events[eventIndex],
              isOpted: newOptStatus
            };
            return { events: updatedEvents };
          }
    };
    initStore(actions, {
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
                    isOpted : false
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
                    isOpted : false
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
                    isOpted : false
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
                    isOpted : false
                }
      ]
    });
  };
  
  export default configureStore;