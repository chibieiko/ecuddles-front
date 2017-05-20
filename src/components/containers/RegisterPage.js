import RegisterPage from '../ui/RegisterPage';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    loggedIn: state.authentication.loggedIn,
    router: props.router
});

const Container = connect(mapStateToProps)(RegisterPage);

export default withRouter(Container);