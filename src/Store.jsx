import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

// import {reducer as todoReducer} from './todos';
// import {reducer as filterReducer} from './filter';
import immutable from 'redux-immutable-state-invariant';
import rootDataReducer from './rootDataReducer';
// import salesMainReducer from './page/sales-main/reducer';
import ABC from './page/sales-main/reducers/ABC';
import DE from './page/sales-main/reducers/DE';
// import Perf from 'react-addons-perf'

const win = window;
// win.Perf = Perf

const reducer = combineReducers({
    rootData: rootDataReducer,
    // salesMain: salesMainReducer,
    ABC: ABC,
    DE: DE
//   todos: todoReducer,
//   filter: filterReducer
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(immutable());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);
export default createStore(reducer, {}, storeEnhancers);
