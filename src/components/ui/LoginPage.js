import {Component} from 'react';
import Spinner from './Spinner';
import {Link} from 'react-router-dom';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    };

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.loggedIn) {
            nextProps.history.goBack();
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state);
    };

    onEmailChanged = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    onPasswordChanged = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    render() {
        return <form onSubmit={this.submitForm}>
            {
                this.props.notification &&
                <div className="alert alert-danger">
                    {this.props.notification.message}
                </div>
            }

            {
                this.props.fetching &&
                <Spinner delay={500} margin={true}/>
            }

            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="email" onChange={this.onEmailChanged}
                       className="form-control" id="exampleInputEmail1"
                       placeholder="email@gmail.com"
                       required
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" onChange={this.onPasswordChanged}
                       className="form-control"
                       id="exampleInputPassword1" placeholder="********"
                       required
                />
            </div>
            <button type="submit" className="btn btn-success">Login</button>
            <div>
                <br/>
                <Link to="/register">
                    Don't have an account yet? Register here
                </Link>
            </div>
        </form>;
    };
};