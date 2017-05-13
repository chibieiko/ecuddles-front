/**
 * Created by vilik on 12.5.2017.
 */
import CartPage from '../ui/CartPage';
import {connect} from 'react-redux';
import {modifyCart} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    cart: state.shoppingCart,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    clearCart() {
        console.log("clearing");
        dispatch(modifyCart({
            entry: {
                product: -1,
                quantity: 0
            },
            showNotification: true
        }));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(CartPage);

export default withRouter(Container);