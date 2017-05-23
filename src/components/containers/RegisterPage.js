import RegisterPage from '../ui/RegisterPage';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {attemptLogin} from '../../actions';

const mapStateToProps = (state, props) => ({
    loggedIn: state.authentication.loggedIn,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    login(credentials) {
        dispatch(attemptLogin(credentials));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export default withRouter(Container);