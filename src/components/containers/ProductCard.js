import ProductCard from '../ui/ProductCard';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {modifyCart} from '../../actions';

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

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductCard);

export default withRouter(Container);
