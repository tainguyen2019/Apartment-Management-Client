import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const devToolCompose = composeWithDevTools({});

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? devToolCompose : compose;

export const middlewares = [thunk];

const enhancers = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancers);

export default store;
