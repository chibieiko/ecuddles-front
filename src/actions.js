import C from './constants';
import fetch from 'isomorphic-fetch';
import FlameThrower from './flameThrower';

export const attemptLogin = value => dispatch => {
    dispatch({
        type: C.ATTEMPT_LOGIN
    });

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    };

    fetch(backendUrl + '/api/login', request)
        .then(response => {
            FlameThrower.burn(response);
            return response.json()
        })
        .then(response => {
            console.log(response);
            dispatch(login(response));
        })
        .catch(error => {
            dispatch(failLogin());
            dispatch(displayNotification(error))
        });
};

export const login = userInfo => ({
    type: C.LOGIN,
    payload: userInfo
});

export const failLogin = () => ({
    type: C.FAIL_LOGIN
});

export const logout = () => ({
    type: C.LOGOUT
});

export const updateCategories = value => dispatch => {
    fetch(backendUrl + '/api/categories', {method: 'GET'})
        .then(response => response.json())
        .then(response => {
            console.log(response);
            dispatch(categoryList(response._embedded.categories));
        })
};

export const categoryList = categories => ({
    type: C.UPDATE_CATEGORIES,
    payload: categories
});

export const displayNotification = notification => dispatch => {
    let timeout = setTimeout(() => {
        dispatch(hideNotification(timeout));
    }, 5000);

    dispatch({
        type: C.DISPLAY_NOTIFICATION,
        payload: {
            visible: true,
            current: notification,
            timeout: timeout
        }
    });
};

export const hideNotification = timeout => dispatch => {
    if (timeout) {
        clearTimeout(timeout);
    }

    dispatch({
        type: C.HIDE_NOTIFICATION
    });
};

export const addToCart = product => dispatch => {
    dispatch({
        type: C.ADD_TO_CART,
        payload: product
    });
};

export const removeFromCart = id => ({
    type: C.REMOVE_FROM_CART,
    payload: id
});

export const clearCart = () => ({
    type: C.CLEAR_CART
});