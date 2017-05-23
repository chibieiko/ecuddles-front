import ProductPage from '../ui/ProductPage';
import C from '../../constants';
import {connect} from 'react-redux';
import {modifyCart, displayNotification} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    cart: state.shoppingCart,
    role: state.authentication.user ? state.authentication.user.role : "",
    router: props.router,
    authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
    addToCart(entry, start, stop) {
        dispatch(modifyCart({
            entry: entry,
            showNotification: true
        }));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductPage);

export default withRouter(Container);