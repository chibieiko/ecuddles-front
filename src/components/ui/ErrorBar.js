/**
 * Created by vili on 10/05/2017.
 */
import {Component} from 'react';
import '../../stylesheets/errorBar.scss';

export default class ErrorBar extends Component {
    constructor(props) {
        super(props);
    };

    onClose = () => {
        this.props.onClose(this.props.error);
    };

    render() {
        return <div className="error-bar-container">
                <div className={this.props.error && this.props.error.visible ? "error-bar error-visible" : "error-bar"}>
                    <div className="container error-bar-content">
                    {this.props.error && this.props.error.current && <span>{this.props.error.current.message}</span>}
                    <button onClick={this.onClose} type="button" className="close" aria-label="Close">
                        <span>&times;</span>
                    </button>
                    </div>
                </div>
        </div>;
    };
};