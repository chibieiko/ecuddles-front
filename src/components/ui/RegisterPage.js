import {Component} from 'react';
import connector from '../../connector';
import {Redirect} from 'react-router-dom';
import FlameThrower from '../../flameThrower';
import Spinner from './Spinner';


export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            registerSuccessful: false
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
                this.setState({
                    fetching: false,
                    registerSuccessful: true
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
                this.state.registerSuccessful &&
                <Redirect to="/login"/>
            }
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" onChange={this.onNameChanged}
                       className="form-control" id="name"
                       placeholder="Firstname Lastname"/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={this.onEmailChanged}
                       className="form-control" id="email"
                       placeholder="example@gmail.com"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={this.onPasswordChanged}
                       className="form-control" id="password"
                       placeholder="********"/>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    };
};