import LoginPage from '../ui/LoginPage';
import {connect} from 'react-redux';
import {attemptLogin} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    loggedIn: state.authentication.loggedIn,
    fetching: state.authentication.fetching,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    onLogin(credentials) {
        dispatch(attemptLogin(credentials));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default withRouter(Container);