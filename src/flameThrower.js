import store from './store';
import {logout} from './actions';

export default class FlameThrower {

    static burn = (response) => {
        if (response.ok) {
            return;
        }

        let responseBody = response.json();
        console.log("BUUURNED ERRRROOOOOR");
        console.log(responseBody);

        switch (response.status) {
            case 500:
                if (responseBody.exception === "com.evil.Exception.TokenException") {
                    store.dispatch(
                        logout()
                    );

                    location.href="#/login";
                    throw new Error("Invalid token");
                } else {
                    throw new Error("Unexpected error occured, please try again later")
                }

            case 401:
                throw new Error("Bad credentials are very bad and i hate errors please dont throw them ok?");

            case 403:
                throw new Error("No authorization");

            case 404:
                throw new Error("Not found");

            default:
                throw new Error("Teddy is not happy at the moment, try again later")
        }
    }
}