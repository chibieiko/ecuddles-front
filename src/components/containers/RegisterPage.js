import RegisterPage from '../ui/RegisterPage';
import {connect} from 'react-redux';
import {displayNotification} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    onError(error) {
        dispatch(displayNotification(error));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export default withRouter(Container);