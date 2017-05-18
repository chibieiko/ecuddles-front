/**
 * Created by vili on 17/05/2017.
 */
import CartItem from '../ui/CartItem';
import {connect} from 'react-redux';
import {modifyCart} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    changeQuantity(product, quantity) {
        dispatch(modifyCart({
            entry: {
                product: product,
                quantity: quantity
            }
        }));
    },
    deleteProduct(product) {
        dispatch(modifyCart({
            entry: {
                product: product,
                quantity: 0
            }
        }));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(CartItem);

export default withRouter(Container);