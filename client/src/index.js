import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import tasksReducer from './store/reducers/tasksReducer';
import usersReducer from './store/reducers/usersReducer';

// import reportWebVitals from './reportWebVitals.js';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  users: usersReducer
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));


// reportWebVitals();
