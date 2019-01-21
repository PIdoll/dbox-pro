import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './Routers.jsx';
import './index.less';

const render = Routers => {
  ReactDOM.render((
    <Routers />
  ), document.getElementById('root'));
}

render(Routers)

if (module.hot) {
  module.hot.accept('./App', (App) => render(App))
}
