/**
 * Created by vilik on 12.5.2017.
 */
import ProductPage from '../ui/ProductPage';
import {connect} from 'react-redux';
import {addToCart} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    addToCart(product) {
        dispatch(addToCart({
            entry: {
                product: product,
                quantity: 1
            },
            showNotification: true
        }));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductPage);

export default withRouter(Container);