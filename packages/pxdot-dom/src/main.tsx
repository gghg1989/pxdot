import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from 'pxdot/store/reducers';
import AppLayout from 'pxdot';
import './css';

declare var devToolsExtension;

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    (typeof devToolsExtension !== 'undefined') ? devToolsExtension() : f => f
  )
);

const target = document.getElementById('app');

const node = (
  <Provider store={store}>
    <AppLayout />
  </Provider>
);

ReactDOM.render(node, target);