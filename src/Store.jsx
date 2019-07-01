import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import immutable from 'redux-immutable-state-invariant';
import rootDataReducer from './reducer';
import { ChildAReducer, ChildDReducer } from './page/sales-main/reducer';

const win = window;
// win.Perf = Perf

const reducer = combineReducers({
  rootData: rootDataReducer,
  childAData: ChildAReducer,
  childDData: ChildDReducer
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
