import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './hooks-store/Event-store';
import LoginProvider from './context/UserLoginContext';
import { BrowserRouter } from 'react-router-dom';

configureStore();

ReactDOM.render(
  <LoginProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoginProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
