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
        case C.LOGIN:
            return {
                loggedIn: true,
                user: action.payload
            };

        case C.LOGOUT:
            return {
                loggedIn: false
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