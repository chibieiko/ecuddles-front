import C from '../constants';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

export const error = (state = null, action) => {
    switch (action.type) {
        case C.DISPLAY_ERROR:
            return action.payload;

        case C.HIDE_ERROR:
            return {
                visible: false,
                current: state.current,
                timeout: null
            };

        default:
            return state;
    }
};

export const shoppingCart = (state = [], action) => {
    switch (action.type) {
        case C.ADD_TO_CART:
            return [
                    ...state,
                    action.payload
                ];

        case C.REMOVE_FROM_CART:
            return state.filter(product => product.id !== action.payload);

        case C.CLEAR_CART:
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
    error,
    shoppingCart,
    authentication,
    categories,
    routing
})