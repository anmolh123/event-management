import React from 'react';
import { NavLink } from 'react-router-dom';

import './navigation.css';

const Navigation = props => {
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact>All Events</NavLink>
          </li>
          <li>
            <NavLink to="/eventForm">Create Event</NavLink>
          </li>
          <li>
            <NavLink to="/myEvents">My Event</NavLink>
          </li>
          <li>
            <NavLink to="/optedEvents">Opted Events</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
