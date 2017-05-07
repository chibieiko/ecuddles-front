import {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../stylesheets/navbar.scss';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" id="hamburger-button" className="navbar-toggle collapsed pull-left"
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
                        {
                            this.props.loggedIn ?
                                <ul className="nav navbar-nav">
                                    <li>
                                        <Link to="/" onClick={this.props.onLogout}>Logout
                                            <span className="sr-only">(current)
                                        </span>
                                        </Link>
                                    </li>
                                </ul>
                                :
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <Link to="/login">
                                            Login
                                            <span
                                                className="sr-only">(current)
                                        </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register">
                                            Register
                                            <span
                                                className="sr-only">(current)
                                        </span>
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
                            <a href="#">Link1<span className="sr-only">(current)</span></a>
                        </li>
                        <li>
                            <a href="#">Link2<span className="sr-only">(current)</span></a>
                        </li>
                        <li>
                            <a href="#">Link3<span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>;
    };


    /*<form className="navbar-form navbar-left">
     <div className="form-group">
     <input type="text" className="form-control" placeholder="Search"/>
     </div>
     <button type="submit" className="btn btn-default">Submit</button>
     </form>*/
};