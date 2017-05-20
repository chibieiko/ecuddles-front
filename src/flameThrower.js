import store from './store';
import {logout} from './actions';

const parseError = (response, reject, errors, defaultMessage) => {
    response.json()
        .then(responseBody => {
            let found = false;

            errors.forEach(error => {
                if (error.exception === responseBody.exception) {
                    if (error.execute) {
                        error.execute();
                    }

                    reject(new Error(error.msg));
                    found = true;
                }
            });

            if (!found) {
                reject(new Error(defaultMessage));
            }
        })
        .catch(e => {
            reject(e);
        });
};

export default class FlameThrower {
    static burn = (response) => {
        return new Promise((resolve, reject) => {
            if (response.ok) {
                response.json()
                    .then(responseBody => resolve(responseBody))
                    .catch(e => resolve());

                return;
            }

            switch (response.status) {
                case 500:
                    parseError(response, reject, [
                        {
                            exception: "com.evil.Exception.TokenException",
                            msg: "Session expired, please log in again",
                            execute: () => {
                                store.dispatch(
                                    logout()
                                );

                                location.href = "#/login";
                            }
                        }
                    ], "An unexpected error occurred, please try again later");

                    return;

                case 400:
                    parseError(response, reject, [
                        {
                            exception: "com.evil.Exception.OutOfStockException",
                            msg: "Quantity of a product in your shopping cart exceeds stock"
                        },
                        {
                            exception: "com.evil.Exception.DuplicateNotificationException",
                            msg: "You are already subscribed for this notification"
                        }
                    ], "Teddy thought the request tasted bad");

                    return;

                case 401:
                    reject(new Error("Incorrect email or password"));
                    return;

                case 403:
                    parseError(response, reject, [
                        {
                            exception: "com.evil.Exception.IllegalReviewException",
                            msg: "You have already submitted review for this product"
                        }
                    ], "Please log in to perform this action");

                    return;

                case 409:
                    reject(new Error("This product is currently in someones shopping cart or all purchases of this product have not been handled."));
                    return;

                case 404:
                    reject(new Error("Teddy couldn't find what you were looking for"));
                    return;

                default:
                    reject(new Error("Teddy is not happy at the moment, try again later"));
                    return;
            }
        });


    }
}