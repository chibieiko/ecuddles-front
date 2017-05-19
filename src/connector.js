/**
 * Created by vili on 13/05/2017.
 */
import fetch from 'isomorphic-fetch';
import FlameThrower from './flameThrower';
import store from './store';
import C from './constants';
import {displayNotification} from './actions'

const api = "http://localhost:8080/api";

export default (path, options={}) => {
    /*
    options:
    {
        request: Fetch request object,
        auth: boolean (send token with request when authenticated),
        hideError: do not display error messages,
        post: object to post
    }
    */

    return new Promise((resolve, reject) => {
        let request = options.request || {};

        let state = store.getState();

        if (options.auth && state.authentication.token) {
            request.headers = request.headers || new Headers();

            request.headers.append("Authorization", state.authentication.token);
        }

        if (options.post) {
            request.headers = request.headers || new Headers();

            request.headers.append("Content-Type", "application/json");

            request.method = "POST";
            request.body = JSON.stringify(options.post);
        } else if (options.delete) {
            request.method = "DELETE";
        }

        fetch(api + path, request)
            .then(response => FlameThrower.burn(response))
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                if (!options.hideError) {
                    store.dispatch(displayNotification({
                        message: error.message,
                        type: C.NOTIFICATION_ERROR
                    }));
                }

                reject(error);
            });
    });
}
