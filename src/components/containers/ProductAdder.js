import ProductAdder from '../ui/ProductAdder';
import {connect} from 'react-redux';
import {addProduct} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    onNewProduct({id, name}) {
        console.log("add new thing");
        dispatch(addProduct(id, name));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductAdder);

export default withRouter(Container);