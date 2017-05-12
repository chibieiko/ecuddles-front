import C from '../constants';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

export const notification = (state = null, action) => {
    switch (action.type) {
        case C.DISPLAY_NOTIFICATION:
            return action.payload;

        case C.HIDE_NOTIFICATION:
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
    let newState;

    switch (action.type) {
        case C.ADD_TO_CART:
            newState = [...state];
            let exists = false;

            newState.forEach(entry => {
                if (entry.product.id === action.payload.product.id) {
                    entry.quantity += action.payload.quantity;
                    exists = true;
                }
            });

            if (!exists) {
                newState.push(action.payload);
            }

            return newState;

        case C.REMOVE_FROM_CART:
            let removedCompletely = false;

            newState = state.filter(entry => {
                let save = entry.product.id !== action.payload.product.id &&
                    entry.quantity > action.payload.quantity;

                if (!save) {
                    removedCompletely = true;
                }

                return save;
            });

            if (!removedCompletely) {
                newState.forEach(entry => {
                    if (entry.product.id === action.payload.product.id) {
                        entry.quantity -= action.payload.quantity;
                    }
                });
            }

            return newState;

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
    notification,
    shoppingCart,
    authentication,
    categories,
    routing
})