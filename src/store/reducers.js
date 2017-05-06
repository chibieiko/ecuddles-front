import C from '../constants';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

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

export const authentication = (state = {loggedIn:false}, action) => {
    switch (action.type) {
        case C.ATTEMPT_LOGIN:
            return {
                error: null,
                fetching: true
            };

        case C.LOGIN:
            return {
                fetching: false,
                error: null,
                loggedIn: true,
                token: action.payload.token,
                user: action.payload.user
            };

        case C.FAIL_LOGIN:
            return {
                error: action.payload,
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
    shoppingCart,
    authentication,
    routing
})