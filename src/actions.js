import C from './constants';

export const login = user => ({
    type: C.LOGIN,
    payload: user
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