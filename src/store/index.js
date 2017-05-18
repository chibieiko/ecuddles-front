import appReducer from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, initialState, composeEnhancers(
    applyMiddleware(thunk)
));

const saveState = () =>
    localStorage["redux-store"] = JSON.stringify(store.getState());

store.subscribe(saveState);

export default store;