import React, { useContext, useRef } from 'react';
import UserLogin from './components/UserLogin/UserLogin';
import EventForm from './components/EventForm/EventForm';
import { UserLoginContext } from './context/UserLoginContext';
import Navigation from './components/Nav/Navigations';
import { Route, Redirect, Switch } from 'react-router-dom';
import EventList from './components/EventList/EventList';
import { ToastProvider } from 'react-toast-notifications';
import Logout from './components/UserLogin/Logout';
import Notifications from './components/EventList/NotificationList';
import UserSignUp from './components/UserLogin/UserSignup';

const usersMappingsHandler = ()=>{
  const users = JSON.parse(localStorage.getItem('users'));
  let usersMap = {};
  for( const key in users ){
      const { userId, name } = users[key];
      usersMap[userId]= name;
  }
  return usersMap;
};


function App() {

  const { userId } = useContext(UserLoginContext);
  const usersMappings = useRef(usersMappingsHandler());

  return (
    <ToastProvider>
      <div className="App">
        {<Redirect from="/" to="/"/>}
        { !userId && <Switch>
                        <Route path="/" component= {UserLogin} exact />
                        <Route path="/signUp" component= {UserSignUp} />
                      </Switch>}
        { userId &&  <React.Fragment>
                      <Navigation />
                      <Switch>
                        <Route path="/" component={EventList} exact />
                        <Route path="/eventForm" component={EventForm} />
                        <Route path="/updateEvent" component={EventForm} />
                        <Route path="/myEvents" render={ () => <EventList filter="my"/>} />
                        <Route path="/optedEvents" render={ () => <EventList filter="opted"/>} />
                        <Route path="/demand" render= { ()=> <EventList filter="demand" usersMappings={usersMappings.current}/> } />
                        <Route path="/logout" component= {Logout} />
                      </Switch>
                      <Notifications/>
                    </React.Fragment>
        }
      </div>
    </ToastProvider>
  );
}

export default App;
