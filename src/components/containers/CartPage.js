/**
 * Created by vilik on 12.5.2017.
 */
import CartPage from '../ui/CartPage';
import {connect} from 'react-redux';
import {updateCategories} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    cart: state.shoppingCart,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    //
});

const Container = connect(mapStateToProps, mapDispatchToProps)(CartPage);

export default withRouter(Container);