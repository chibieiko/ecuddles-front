import C from '../constants';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

export const notification = (state = null, action) => {
    switch (action.type) {
        case C.DISPLAY_NOTIFICATION:
            if (state && state.timeout) {
                clearTimeout(state.timeout);
            }

            return action.payload;

        case C.HIDE_NOTIFICATION:
            if (state && state.timeout) {
                clearTimeout(state.timeout);
            }

            return {
                visible: false,
                current: state.current,
                timeout: null
            };

        default:
            return state;
    }
};

export const cartProgress = (state = 0, action) => {
    switch (action.type) {
        case C.SAVE_PROGRESS:
            return action.payload;

        case C.RESET_PROGRESS:
            return 0;

        case C.CHECKOUT:
            return 0;

        default:
            return state;
    }
};

export const cartPhases = (state = null, action) => {
    switch (action.type) {
        case C.SAVE_PHASE:
            let newState = {};
            let updated = false;

            if (state) {
                Object.keys(state).forEach(key => {
                    if (action.payload.key === key) {
                        newState[key] = action.payload.content;
                        updated = true;
                    } else {
                        newState[key] = state[key];
                    }
                });
            }

            if (!updated) {
                newState[action.payload.key] = action.payload.content;
            }

            return newState;

        case C.CHECKOUT:
            return null;

        default:
            return state;
    }
};

export const shoppingCart = (state = [], action) => {
    switch (action.type) {
        case C.UPDATE_CART:
            return action.payload;

        case C.CHECKOUT:
            return [];

        default:
            return state;
    }
};

export const categories = (state = [], action) => {
    switch (action.type) {
        case C.UPDATE_CATEGORIES:
            return action.payload;

        default:
            return state;
    }
};

export const authentication = (state = {loggedIn:false}, action) => {
    switch (action.type) {
        case C.ATTEMPT_LOGIN:
            return {
                fetching: true
            };

        case C.LOGIN:
            return {
                fetching: false,
                loggedIn: true,
                token: action.payload.token,
                user: action.payload.user
            };

        case C.FAIL_LOGIN:
            return {
                fetching: false
            };

        case C.LOGOUT:
            return {
                loggedIn: false,
                token: null,
                user: null
            };

        default:
            return state;
    }
};

export default combineReducers({
    notification,
    shoppingCart,
    cartPhases,
    cartProgress,
    authentication,
    categories,
    routing
});