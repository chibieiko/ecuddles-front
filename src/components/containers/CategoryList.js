import CategoryList from '../ui/CategoryList';
import {connect} from 'react-redux';
import {updateCategories} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    categories: state.categories,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    loadCategories() {
        dispatch(updateCategories());
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(CategoryList);

export default withRouter(Container);