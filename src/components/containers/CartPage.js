/**
 * Created by vilik on 12.5.2017.
 */
import CartPage from '../ui/CartPage';
import {connect} from 'react-redux';
import {modifyCart, saveProgress, savePhase, checkout} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    cart: state.shoppingCart,
    phases: state.cartPhases,
    current: state.cartProgress,
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
    },
    changeQuantity(product, quantity) {
        console.log("Product: " + product + " | Quantity: " + quantity);
    },
    saveProgress(index) {
        dispatch(saveProgress(index));
    },
    savePhase(index, content) {
        console.log("Saving phase " + index + " with data:", content);
        dispatch(savePhase({
            key: index,
            content: content ? content : {}
        }))
    },
    checkout() {
        dispatch(checkout());
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(CartPage);

export default withRouter(Container);