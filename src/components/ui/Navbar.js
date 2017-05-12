import {Component} from 'react';
import ErrorBar from '../containers/NotificationBar';
import {Link} from 'react-router-dom';
import '../../stylesheets/navbar.scss';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <span>
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
                                  role="search">
                                <div className="input-group nav-searchbar">
                                    <input type="text" id="product-search" className="form-control"
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
                                            <Link to="/" onClick={this.props.onLogout}>
                                                Logout
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/cart">
                                                Cart
                                                {
                                                    this.props.cart.length > 0 &&
                                                    <span> ({this.props.cartItemCount})</span>
                                                }
                                            </Link>
                                        </li>
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
                            <li>
                                <a href="#">Link1<span
                                    className="sr-only">(current)</span></a>
                            </li>
                            <li>
                                <a href="#">Link2<span
                                    className="sr-only">(current)</span></a>
                            </li>
                            <li>
                                <a href="#">Link3<span
                                    className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <ErrorBar/>
            <form className="hidden-sm hidden-md hidden-lg breather"
                  role="search">
                <div className="input-group">
                    <input type="text" className="form-control"
                           placeholder="Search"/>
                    <div className="input-group-btn">
                        <button type="submit"
                                className="btn btn-default"><span
                            className="glyphicon glyphicon-search"/></button>
                    </div>
                </div>
            </form>
        </span>;
    };
};