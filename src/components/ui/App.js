import {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import RegisterPage from '../containers/RegisterPage';
import CategoryList from '../containers/CategoryList';
import EditCategoriesPage from './EditCategoriesPage';
import CartPage from '../containers/CartPage';
import LogPage from './LogPage';
import Navbar from '../containers/Navbar';
import LoginPage from '../containers/LoginPage';
import AddProductPage from './AddProductPage';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {syncHistoryWithStore} from 'react-router-redux';
import store from '../../store';
import Footer from './Footer';
import {updateCart} from '../../actions';
import ModifyProductPage from './ModifyProductPage';

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
                            <div className="container after-navbar">
                                <Switch>
                                    <Route path="/login" component={LoginPage}/>
                                    <Route path="/register" component={RegisterPage}/>
                                    <Route path="/cart" component={CartPage}/>
                                    <Route path="/log" component={LogPage}/>
                                    <Route path="/edit-categories" component={EditCategoriesPage}/>
                                    <Route path="/add-product" component={AddProductPage}/>
                                    <Route path="/modify-product/:id/:name" component={ModifyProductPage}/>
                                    <Route path="/" component={CategoryList}/>
                                </Switch>
                            </div>
                            <Footer/>
                        </div>
                    </Router>
                </Provider>
            </div>
        )
    }
}