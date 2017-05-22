import ProductForm from '../ui/ProductForm';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
        authentication: state.authentication,
        router: props.router,
        categories: state.categories
});

const mapDispatchToProps = dispatch => ({
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductForm);

export default withRouter(Container);