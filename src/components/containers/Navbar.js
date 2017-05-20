import Navbar from '../ui/Navbar';
import {connect} from 'react-redux';
import {logout} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => {

    let cartItemCount = 0;

    state.shoppingCart.forEach(entry => {
        cartItemCount += entry.quantity;
    });

    return {
        cart: state.shoppingCart,
        cartItemCount: cartItemCount,
        loggedIn: state.authentication.loggedIn,
        user: state.authentication.user,
        router: props.router,
        categories: state.categories
    };
};

const mapDispatchToProps = dispatch => ({
    onLogout() {
        dispatch(logout());
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default withRouter(Container);