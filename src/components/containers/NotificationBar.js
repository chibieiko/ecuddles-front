import NotificationBar from '../ui/NotificationBar';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {hideNotification} from '../../actions';

const mapStateToProps = (state, props) => ({
    notification: state.notification,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    onClose() {
        dispatch(hideNotification());
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(NotificationBar);

export default withRouter(Container);