import C from './constants';
import connector from './connector';

export const attemptLogin = value => dispatch => {
    dispatch({
        type: C.ATTEMPT_LOGIN
    });

    connector("/login", {post: value})
        .then(response => {
            dispatch(login(response));
        })
        .catch(() => {
            dispatch(failLogin());
        });
};

export const login = userInfo => dispatch => {
    dispatch({
        type: C.LOGIN,
        payload: userInfo
    });

    dispatch(updateCart());
};

export const failLogin = () => ({
    type: C.FAIL_LOGIN
});

export const logout = () => dispatch => {
    dispatch({
        type: C.LOGOUT
    });

    dispatch(updateCart());
};

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

export const updateCart = () => (dispatch, getState) => {
    if (getState().authentication.loggedIn) {
        connector("/cart", {auth: true})
            .then((response=[]) => {
                dispatch({
                    type: C.UPDATE_CART,
                    payload: response
                });
            })
            .catch(() => {
                dispatch({
                    type: C.UPDATE_CART,
                    payload: []
                });
            });
    } else {
        dispatch({
            type: C.UPDATE_CART,
            payload: []
        });
    }
};

export const modifyCart = ({entry, showNotification}) => dispatch  => {
    connector('/cart/modify/?product=' + entry.product + '&quantity=' + entry.quantity, {auth: true})
        .then(response => {
            dispatch(updateCart());

            if (showNotification) {
                dispatch(displayNotification({
                    message: "Great choice! The product has been added to your shopping cart.",
                    type: C.NOTIFICATION_SUCCESS
                }));
            }
        });
};

export const removeFromCart = id => dispatch => {
    /*
    dispatch({type: C.REMOVE_FROM_CART,
        payload: id
    });
    */
};

export const clearCart = () => dispatch => {
    /*
    dispatch({
        type: C.CLEAR_CART
    })
    */
};