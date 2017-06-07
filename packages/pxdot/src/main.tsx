import * as React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './store/reducers';
import AppLayout from './app';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk)
  )
);

export default (
  <Provider store={store}>
    <AppLayout />
  </Provider>
);

