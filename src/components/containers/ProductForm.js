import ProductForm from '../ui/ProductForm';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import C from '../../constants';
import {displayNotification} from '../../actions';

const mapStateToProps = (state, props) => ({
        authentication: state.authentication,
        router: props.router,
        categories: state.categories
});

const mapDispatchToProps = dispatch => ({
    noPictureError() {
        dispatch(displayNotification({
            message: "Product must have at least one picture",
            type: C.NOTIFICATION_ERROR
        }))
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductForm);

export default withRouter(Container);