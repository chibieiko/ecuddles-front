import {Component} from 'react';
import {Router, Route, Redirect} from 'react-router';
import RegisterPage from './RegisterPage';
import CategoryList from './CategoryList';
import LoginPage from './LoginPage';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {syncHistoryWithStore} from 'react-router-redux';
import store from '../../store';

export default class App extends Component {
    constructor(props) {
        super(props);

        // todo remove when app is ready
        window.store = store;
    }

    render() {
        let loggedIn = store.getState().authentication.loggedIn;

        const history = syncHistoryWithStore(createBrowserHistory(), store);

        return (
            <Provider store={store}>
                <Router history={ history }>
                    <div>
                        <Route path="/login" render={() => (
                            loggedIn ? <Redirect to="/"/> : <LoginPage/>
                        )}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <Route path="/" component={CategoryList}>
                            <Route/>
                        </Route>
                    </div>
                </Router>
            </Provider>
        )
    }
}