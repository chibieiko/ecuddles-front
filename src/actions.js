import C from './constants';
import fetch from 'isomorphic-fetch';



export const addProduct = (id, name) => ({
    type: C.ADD_PRODUCT,
    payload: {
        id,
        name
    }
});

export const buyProduct = (id) => ({
    type: C.BUY_PRODUCT,
    payload: id
});

export const suggestProductNames = value => dispatch => {

    dispatch({
        type: C.FETCH_PRODUCT_NAMES
    });

    fetch('http://localhost:8080/api/products/search/contains?name=' + value)
        .then(response => response.json())
        .then(json => {
            let products = json._embedded.products;

            if (products && products.length > 0) {
                dispatch({
                    type: C.CHANGE_SUGGESTIONS,
                    payload: json._embedded.products
                });
            } else {
                dispatch({
                    type: C.CANCEL_FETCHING
                });

                dispatch(clearSuggestions());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: C.CANCEL_FETCHING
            });

            dispatch(clearSuggestions());
        })
};

export const clearSuggestions = () => ({
    type: C.CLEAR_SUGGESTIONS
});