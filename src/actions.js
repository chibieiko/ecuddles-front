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

export const savePhase = (phase) => ({
    type: C.SAVE_PHASE,
    payload: phase // {key, content}
});

export const saveProgress = (index) => ({
    type: C.SAVE_PROGRESS,
    payload: index
});

export const checkout = (start, stop) => (dispatch, getState) => {
    let content = getState().cartPhases[1];

    let url = "?name=" + content.name +
            "&address=" + content.address +
            "&postalCode=" + content.postalCode +
            "&city=" + content.city +
            "&phone=" + content.phone;

    if (start) {
        start();
    }

    connector("/cart/checkout" + url, {auth: true})
        .then(response => {
            if (stop) {
                stop();
            }

            dispatch({
                type: C.CHECKOUT
            });

            dispatch(displayNotification({
                type: C.NOTIFICATION_SUCCESS,
                message: "Thank you for your purchase!"
            }));
        })
        .catch(error => {
            if (stop) {
                stop();
            }

            dispatch(updateCart());
            dispatch(saveProgress(0));
        });
};

export const hideNotification = () => ({
    type: C.HIDE_NOTIFICATION
});

export const updateCart = (stop) => (dispatch, getState) => {
    if (getState().authentication.loggedIn) {
        connector("/cart", {auth: true})
            .then((response = []) => {
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

export const modifyCart = ({entry, showNotification}) => dispatch => {
    connector('/cart/modify/?product=' + entry.product + '&quantity=' + entry.quantity, {auth: true})
        .then(response => {
            dispatch({
                type: C.RESET_PROGRESS
            });

            dispatch(updateCart());

            if (showNotification) {
                let msg = entry.product === -1 ?
                    "You shopping cart was successfully cleared!"
                    :
                    entry.quantity > 0 ?
                        "Great choice! The product has been added to your shopping cart."
                        :
                        "One product was successfully deleted from your shopping cart.";

                dispatch(displayNotification({
                    message: msg,
                    type: C.NOTIFICATION_SUCCESS
                }));
            }
        });
};