import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store.jsx';
import './index.less';


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// render();
// store.subscribe(render)



// const render = App => {
//   ReactDOM.render((
//     <App />
//   ), document.getElementById('root'));
// }

// render(App)

if (module.hot) {
  module.hot.accept('./App', (App) => render(App));
}
