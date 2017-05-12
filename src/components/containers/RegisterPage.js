import RegisterPage from '../ui/RegisterPage';
import {connect} from 'react-redux';
import {displayNotification} from '../../actions';
import {withRouter} from 'react-router';
import C from '../../constants';

const mapStateToProps = (state, props) => ({
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    onError(error) {
        dispatch(displayNotification({
            message: error.message,
            type: C.NOTIFICATION_ERROR
        }));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export default withRouter(Container);