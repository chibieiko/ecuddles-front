import {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import RegisterPage from '../containers/RegisterPage';
import CategoryList from '../containers/CategoryList';
import CartPage from '../containers/CartPage';
import Navbar from '../containers/Navbar';
import LoginPage from '../containers/LoginPage';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {syncHistoryWithStore} from 'react-router-redux';
import store from '../../store';
import {updateCart} from '../../actions';

export default class App extends Component {
    constructor(props) {
        super(props);

        // todo remove when app is ready
        window.store = store;
    }

    componentDidMount() {
        store.dispatch(updateCart());
    }

    render() {
        const history = syncHistoryWithStore(createBrowserHistory(), store);

        return (
            <div>
                <Provider store={store}>
                    <Router history={ history }>
                        <div>
                            <Navbar/>
                            <div className="container">
                                <Switch>
                                    <Route path="/login" component={LoginPage}/>
                                    <Route path="/register" component={RegisterPage}/>
                                    <Route path="/cart" component={CartPage}/>
                                    <Route path="/" component={CategoryList}/>
                                </Switch>
                            </div>
                        </div>
                    </Router>
                </Provider>
            </div>
        )
    }
}