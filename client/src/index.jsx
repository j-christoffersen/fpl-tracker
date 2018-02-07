import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

import App from './components/App';
import reducers from './reducers';

import { updatePlayers } from './actions';

const store = createStore(reducers, applyMiddleware(reduxPromise));

// TODO: move somewhere else
// reference: https://redux.js.org/docs/api/Store.html#subscribe
let current;
store.subscribe(() => {
  const prev = current;
  current = store.getState().stat;
  const playerIds = store.getState().players.map(player => player.id);
  if (current !== prev) {
    store.dispatch(updatePlayers(current, playerIds));
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
