import './styles/app.scss';
import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import ymnApp from './redux/reducers';
import App from './containers/App';

// let store = createStore(ymnApp);

render(
  // <Provider store={store}>
    <App />,
  // </Provider>,
  document.querySelector('#app')
);
