import C from './constants';
import fetch from 'isomorphic-fetch';
import FlameThrower from './flameThrower';
import connector from './connector';

export const attemptLogin = value => dispatch => {
    dispatch({
        type: C.ATTEMPT_LOGIN
    });

    connector("/login", { post: value })
        .then(response => {
            dispatch(login(response));
        })
        .catch(() => {
            dispatch(failLogin());
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
    connector("/categories", {hideError: true})
        .then(response => {
            dispatch(categoryList(response._embedded.categories));
        });
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

export const hideNotification = () => ({
    type: C.HIDE_NOTIFICATION
});

export const addToCart = ({entry, showNotification}) => dispatch => {
    connector('/cart/modify/?product=' + entry.product.id + '&quantity=' + entry.quantity, {auth: true})
        .then(response => {
            dispatch({
                type: C.ADD_TO_CART,
                payload: entry
            });

            if (showNotification) {
                dispatch(displayNotification({
                    message: "Great choice! " + entry.product.name + " was added to your shopping cart.",
                    type: C.NOTIFICATION_SUCCESS
                }));
            }
        })
};

export const removeFromCart = id => ({
    type: C.REMOVE_FROM_CART,
    payload: id
});

export const clearCart = () => ({
    type: C.CLEAR_CART
});