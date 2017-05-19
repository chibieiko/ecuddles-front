/**
 * Created by vilik on 12.5.2017.
 */
import ProductPage from '../ui/ProductPage';
import C from '../../constants';
import {connect} from 'react-redux';
import {modifyCart, displayNotification} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    cart: state.shoppingCart,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    addToCart(entry) {
        dispatch(modifyCart({
            entry: entry,
            showNotification: true
        }));
    },
    subscribeSuccess() {
        dispatch(displayNotification({
            type: C.NOTIFICATION_SUCCESS,
            message: "Successfully subscribed to email notification when the product becomes available"
        }));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductPage);

export default withRouter(Container);