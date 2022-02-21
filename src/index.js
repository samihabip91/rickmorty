import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider } from 'react-redux';

import App from './modules/App/App.js';
import configureStore from './store/index.js';

import './content/sass/styles.scss';

const store = configureStore({
  locations: []
});

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
