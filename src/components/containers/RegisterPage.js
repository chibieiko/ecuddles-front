import RegisterPage from '../ui/RegisterPage';
import {connect} from 'react-redux';
import {displayError} from '../../actions';
import {withRouter} from 'react-router';

const mapStateToProps = (state, props) => ({
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    onError(error) {
        dispatch(displayError(error));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export default withRouter(Container);