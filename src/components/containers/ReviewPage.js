import ReviewPage from '../ui/ReviewPage';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {displayNotification} from '../../actions';
import C from '../../constants';

const mapStateToProps = (state, props) => ({
    router: props.router,
    authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
    onReviewAddError() {
        dispatch(displayNotification({
            message: "Please log in to add a review",
            type: C.NOTIFICATION_ERROR
        }))
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ReviewPage);

export default withRouter(Container);