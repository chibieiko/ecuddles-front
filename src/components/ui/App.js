import {Component} from 'react';
import {Link, HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
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
                        <Switch>
                            <Route path="/login" render={() => (
                                loggedIn ? <Redirect to="/"/> : <LoginPage/>
                            )}/>
                            <Route path="/register" component={RegisterPage}/>
                            <Route path="/cart" component={RegisterPage}/>
                            <Route path="/" component={CategoryList}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}