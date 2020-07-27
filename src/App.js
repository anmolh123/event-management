import React, { useContext } from 'react';
import UserLogin from './components/UserLogin/UserLogin';
import EventForm from './components/EventForm/EventForm';
import { UserLoginContext } from './context/UserLoginContext';
import Navigation from './components/Nav/Navigations';
import { Route, Redirect } from 'react-router-dom';
import EventList from './components/EventList/EventList';
import { ToastProvider } from 'react-toast-notifications';

function App() {

  const { userId } = useContext(UserLoginContext);

  return (
    <ToastProvider>
      <div className="App">
        { !userId && <Redirect from="/" to="/"/> }
        { !userId && <UserLogin/> }
        { userId &&  <React.Fragment>
                      <Navigation />
                      <main>
                        <Route path="/" component={EventList} exact />
                        <Route path="/eventForm" component={EventForm} />
                        <Route path="/updateEvent" component={EventForm} />
                        <Route path="/myEvents" render={ () => <EventList filter="my"/>} />
                        <Route path="/optedEvents" render={ () => <EventList filter="opted"/>} />
                      </main>
                    </React.Fragment>
        }
      </div>
    </ToastProvider>
  );
}

export default App;
