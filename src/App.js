import React, { useContext } from 'react';
import './App.css';
import UserLogin from './components/UserLogin/UserLogin';
import EventForm from './components/EventForm/EventForm';
import { UserLoginContext } from './context/UserLoginContext';
import Navigation from './components/Nav/Navigations';
import { Route, Redirect } from 'react-router-dom';
import EventList from './components/EventList/EventList';

function App() {

  const { userId } = useContext(UserLoginContext);

  return (
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
  );
}

export default App;
