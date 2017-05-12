import store from './store';
import {logout} from './actions';

export default class FlameThrower {

    static burn = (response) => {
        if (response.ok) {
            return;
        }

        switch (response.status) {
            case 500:
                if (responseBody.exception === "com.evil.Exception.TokenException") {
                    store.dispatch(
                        logout()
                    );

                    location.href="#/login";
                    throw new Error("Invalid token");
                } else {
                    throw new Error("Teddy is not happy at the moment, try again later");
                }

            case 400:
                if (responseBody.exception === "com.evil.Exception.OutOfStockException") {
                    throw new Error("Quantity of this product in your shopping cart exceeds stock!");
                } else {
                    throw new Error("Bad request!");
                }

            case 401:
                throw new Error("Incorrect email or password");

            case 403:
                throw new Error("No authorization");

            case 404:
                throw new Error("Not found");

            default:
                throw new Error("Teddy is not happy at the moment, try again later");
        }
    }
}