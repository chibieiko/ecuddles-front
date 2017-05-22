import ProductListSort from '../ui/ProductListSort';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    authentication: state.authentication,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductListSort);

export default withRouter(Container);