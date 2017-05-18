import ProductReview from '../ui/ProductReview';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    router: props.router,
    authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductReview);

export default withRouter(Container);