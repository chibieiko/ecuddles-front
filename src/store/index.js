import appReducer from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;