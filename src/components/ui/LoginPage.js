import {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    };

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
                this.props.error &&
                <div className="alert alert-danger">
                    {this.props.error.message}
                </div>
            }

            {
                this.props.fetching &&
                <div>IM PRETTY COOL SPINNER, PRETTY COOL!</div>
            }

            {
                this.props.loggedIn &&
                    <Redirect to="/"/>
            }

            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="email" onChange={this.onEmailChanged} className="form-control" id="exampleInputEmail1" placeholder="email@gmail.com"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" onChange={this.onPasswordChanged} className="form-control" id="exampleInputPassword1" placeholder="********"/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>;
    };
};