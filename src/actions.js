import C from './constants';
import fetch from 'isomorphic-fetch';

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
        .then(response => response.json())
        .then(response => {
            console.log(response);

            if (response.error) {
                throw new Error("Bad credentials");
            }

            dispatch(login(response));
        })
        .catch(error => {
            dispatch(failLogin(error));
        });
};

export const login = userInfo => ({
    type: C.LOGIN,
    payload: userInfo
});

export const failLogin = error => ({
    type: C.FAIL_LOGIN,
    payload: error
});

export const logout = () => ({
    type: C.LOGOUT
});

export const addToCart = product => ({
    type: C.ADD_TO_CART,
    payload: product
});

export const removeFromCart = id => ({
    type: C.REMOVE_FROM_CART,
    payload: id
});

export const clearCart = () => ({
    type: C.CLEAR_CART
});