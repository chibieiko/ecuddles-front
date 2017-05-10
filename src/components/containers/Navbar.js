import Navbar from '../ui/Navbar';
import {connect} from 'react-redux';
import {logout} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    loggedIn: state.authentication.loggedIn,
    user: state.authentication.user,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    onLogout() {
        dispatch(logout());
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default withRouter(Container);