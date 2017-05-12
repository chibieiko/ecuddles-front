import ErrorBar from '../ui/NotificationBar';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {hideNotification} from '../../actions';

const mapStateToProps = (state, props) => ({
    notification: state.notification,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    onClose(notification) {
        dispatch(hideNotification(notification.timeout));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ErrorBar);

export default withRouter(Container);