import ProductLister from '../ui/ProductLister';
import {connect} from 'react-redux';
import {suggestProductNames, clearSuggestions} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    suggestions: state.productNames.suggestions,
    fetching: state.productNames.fetching,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    onChange(name) {
        if (name) {
            console.log("add new thing");
            console.log(name);
            dispatch(suggestProductNames(name));
        } else {
            dispatch(
                clearSuggestions()
            )
        }
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ProductLister);

export default withRouter(Container);