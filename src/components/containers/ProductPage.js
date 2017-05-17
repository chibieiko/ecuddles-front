/**
 * Created by vilik on 12.5.2017.
 */
import ProductPage from '../ui/ProductPage';
import {connect} from 'react-redux';
import {modifyCart} from '../../actions';
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
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductPage);

export default withRouter(Container);