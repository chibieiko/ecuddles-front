import ReviewForm from '../ui/ReviewForm';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {displayNotification} from '../../actions';
import C from '../../constants';

const mapStateToProps = (state, props) => ({
    router: props.router,
    authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
    onReviewAdd() {
        dispatch(displayNotification({
            message: "Review added successfully",
            type: C.NOTIFICATION_SUCCESS
        }))
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ReviewForm);

export default withRouter(Container);