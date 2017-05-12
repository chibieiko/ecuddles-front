import store from './store';
import {logout} from './actions';

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
                    response.json()
                        .then(responseBody => {
                            if (responseBody.exception === "com.evil.Exception.TokenException") {
                                store.dispatch(
                                    logout()
                                );

                                location.href = "#/login";
                                reject(new Error("Invalid token"));
                            } else {
                                reject(new Error("Teddy is not happy at the moment, try again later"));
                            }
                        })
                        .catch(e => {
                            reject(e);
                        });

                    return;

                case 400:
                    response.json()
                        .then(responseBody => {
                            if (responseBody.exception === "com.evil.Exception.OutOfStockException") {
                                reject(new Error("Quantity of this product in your shopping cart exceeds stock!"));
                            } else {
                                reject(new Error("Bad request!"));
                            }
                        })
                        .catch(e => {
                            reject(e);
                        });

                    return;

                case 401:
                    reject(new Error("Incorrect email or password"));
                    return;

                case 403:
                    reject(new Error("No authorization"));
                    return;

                case 404:
                    reject(new Error("Not found"));
                    return;

                default:
                    reject(new Error("Teddy is not happy at the moment, try again later"));
                    return;
            }
        });


    }
}