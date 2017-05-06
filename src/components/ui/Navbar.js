import {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar-collapse" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <Link to="/" className="navbar-brand">eCuddles</Link>
                </div>
                <div className="collapse navbar-collapse" id="navbar-collapse">
                        { this.props.loggedIn ?
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <Link to="/" onClick={this.props.onLogout}>Logout <span className="sr-only">(current)</span></Link>
                                </li>
                            </ul>
                            :
                            <ul className="nav navbar-nav navbar-right">
                                <li className={this.props.location.pathname === "/login" && "active"}>
                                    <a><Link to="/login">Login <span className="sr-only">(current)</span></Link></a>
                                </li>
                                <li className={this.props.location.pathname === "/register" && "active"}>
                                    <a><Link to="/register">Register <span className="sr-only">(current)</span></Link></a>
                                </li>
                            </ul>
                        }
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