import ErrorBar from '../ui/ErrorBar';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {hideError} from '../../actions';

const mapStateToProps = (state, props) => ({
    error: state.error,
    router: props.router
});

const mapDispatchToProps = dispatch => ({
    onClose(error) {
        dispatch(hideError(error.timeout));
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(ErrorBar);

export default withRouter(Container);