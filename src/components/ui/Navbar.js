import {Component} from 'react';
import NotificationBar from '../containers/NotificationBar';
import {Link} from 'react-router-dom';
import '../../stylesheets/navbar.scss';
import {matchPath} from 'react-router'

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ""
        }
    };

    submitForm = (event) => {
        event.preventDefault();
        this.props.history.push("/search/" + this.state.search);

        this.setState({
            search: ""
        });
    };

    onSearchChanged = (event) => {
        this.setState({
            search: event.target.value
        });
    };

    displaySearchBar = () => {
        return matchPath(this.props.location.pathname, {
            path: ['/', '/category/:id', '/category/:id/:name', '/search', '/search/:name'],
            exact: true,
            strict: false
        });
    };

    render() {
        return <span>
                <div className="navbar-fixed-top">
                <nav className="navbar navbar-default" id="ecuddles-navbar">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" id="hamburger-button"
                                className="navbar-toggle collapsed pull-left"
                                data-toggle="collapse"
                                data-target="#navbar-collapse"
                                aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <Link to="/" className="navbar-brand">eCuddles</Link>
                        <div className="navbar-header-menu">
                            <form className="navbar-form navbar-left hidden-xs"
                                  role="search" onSubmit={this.submitForm}>
                                <div className="input-group nav-searchbar">
                                    <input type="text" id="product-search"
                                           onChange={this.onSearchChanged}
                                           className="form-control"
                                           value={this.state.search && this.state.search}
                                           placeholder="Search"/>
                                    <div className="input-group-btn">
                                    <button type="submit" id="search-button"
                                            className="btn btn-default"><span
                                        className="glyphicon glyphicon-search"/></button>
                                    </div>
                                </div>
                            </form>
                            {
                                this.props.loggedIn ?
                                    <ul className="nav navbar-nav navbar-right">
                                        <li>
                                            <Link to="/"
                                                  onClick={this.props.onLogout}>
                                                Logout
                                            </Link>
                                        </li>
                                        {
                                            this.props.user.role === "ADMIN" ?
                                                <li className={this.props.location.pathname === "/log" && "active"}>
                                                    <Link to="/log">
                                                        <div className="navbar-cart">
                                                            Purchases
                                                        </div>
                                                    </Link>
                                                </li>
                                                :
                                                <li className={this.props.location.pathname === "/cart" && "active"}>
                                                    <Link to="/cart">
                                                        <div className="navbar-cart">
                                                            Cart
                                                            {
                                                                this.props.cart.length > 0 &&
                                                                <span className="badge"
                                                                      id="cart-badge">{this.props.cartItemCount}</span>
                                                            }
                                                        </div>
                                                    </Link>
                                                </li>
                                        }
                                    </ul>
                                    :
                                    <ul className="nav navbar-nav navbar-right">
                                        <li className={this.props.location.pathname === "/login" && "active"}>
                                            <Link to="/login">
                                                Login
                                            </Link>
                                        </li>
                                        <li className={this.props.location.pathname === "/register" && "active"}>
                                            <Link to="/register">
                                                Register
                                            </Link>
                                        </li>
                                    </ul>
                            }
                        </div>
                    </div>
                    <div className="collapse navbar-collapse"
                         id="navbar-collapse">
                        <ul className="nav navbar-nav hidden-sm hidden-md hidden-lg"
                            id="categories">
                            {
                                this.props.categories && this.props.categories.map(category =>
                                    <li key={category.id}
                                        className={this.props.location.pathname === "/category/" + category.id + "/" + category.name ? "active-category nav-category-link" : "nav-category-link"}>
                                        <Link
                                            to={'/category/' + category.id + '/' + category.name}
                                            data-toggle="collapse"
                                            data-target=".navbar-collapse.in">
                                            {category.name}
                                        </Link>
                                    </li>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <NotificationBar/>
            </div>

            {
                this.displaySearchBar() ?
                    <div className="row">
                        <div className="col-xs-12">
                            <form
                                className="hidden-sm hidden-md hidden-lg breather after-navbar-search"
                                role="search" onSubmit={this.submitForm}>
                                <div className="input-group">
                                    <input type="text" className="form-control"
                                           onChange={this.onSearchChanged}
                                           value={this.state.search && this.state.search}
                                           placeholder="Search"/>
                                    <div className="input-group-btn">
                                        <button type="submit"
                                                className="btn btn-default"><span
                                            className="glyphicon glyphicon-search"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <div className="after-navbar-search"/>
            }
        </span>;
    };
};