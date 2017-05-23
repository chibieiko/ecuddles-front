import {Component} from 'react';
import connector from '../../connector';
import {Redirect} from 'react-router-dom';
import Spinner from './Spinner';


export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false
        };
    };

    onNameChanged = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    onEmailChanged = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    onPasswordChanged = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    submitForm = (event) => {
        event.preventDefault();

        let body = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        this.setState({
            fetching: true
        });

        connector("/register", {post: body})
            .then(() => {
                this.props.login({
                    email: this.state.email,
                    password: this.state.password
                });
            })
            .catch(() => {
                this.setState({
                    fetching: false
                });
            });
    };

    render() {
        return <form onSubmit={this.submitForm}>
            {
                this.state.fetching &&
                <Spinner delay={500} margin={true}/>
            }
            {
                this.props.loggedIn &&
                <Redirect to="/"/>
            }
            <div className="form-group">
                <label htmlFor="name">Nickname</label>
                <input type="text" onChange={this.onNameChanged}
                       className="form-control" id="name"
                       placeholder="Nickname"
                       required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={this.onEmailChanged}
                       className="form-control" id="email"
                       placeholder="example@gmail.com"
                       autoComplete="off"
                       required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={this.onPasswordChanged}
                       className="form-control" id="password"
                       placeholder="********"
                       autoComplete="off"
                       required
                />
            </div>
            <button type="submit" className="btn btn-success">Register</button>
        </form>
    };
};