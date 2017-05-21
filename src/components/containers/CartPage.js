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
    saveProgress(index) {
        dispatch(saveProgress(index));
    },
    savePhase(index, content) {
        dispatch(savePhase({
            key: index,
            content: content ? content : {}
        }))
    },
    checkout(start, stop) {
        dispatch(checkout(start, stop));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(CartPage);

export default withRouter(Container);