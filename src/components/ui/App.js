import {Component} from 'react';
import {Link, HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import RegisterPage from './RegisterPage';
import CategoryList from './CategoryList';
import Navbar from './Navbar';
import LoginPage from '../containers/LoginPage';
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
        const history = syncHistoryWithStore(createBrowserHistory(), store);

        return (
            <div>
                <Navbar/>
                <Provider store={store}>
                    <Router history={ history }>
                        <div className="container">
                            <Switch>
                                <Route path="/login" component={LoginPage}/>
                                <Route path="/register" component={RegisterPage}/>
                                <Route path="/cart" component={RegisterPage}/>
                                <Route path="/" component={CategoryList}/>
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </div>
        )
    }
}