import ProductList from '../ui/ProductList';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
        router: props.router
});

const mapDispatchToProps = dispatch => ({

});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductList);

export default withRouter(Container);