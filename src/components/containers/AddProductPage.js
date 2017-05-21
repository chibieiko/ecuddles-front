import AddProductPage from '../ui/AddProductPage';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
        authentication: state.authentication,
        router: props.router,
        categories: state.categories
});

const mapDispatchToProps = dispatch => ({
});

const Container = connect(mapStateToProps, mapDispatchToProps)(AddProductPage);

export default withRouter(Container);