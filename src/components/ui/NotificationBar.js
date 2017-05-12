import {Component} from 'react';
import '../../stylesheets/notificationBar.scss';

export default class ErrorBar extends Component {
    constructor(props) {
        super(props);
    };

    onClose = () => {
        this.props.onClose(this.props.notification);
    };

    render() {
        return <div className="notification-bar-container">
                <div className={this.props.notification && this.props.notification.visible ? "notification-bar notification-visible" : "notification-bar"}>
                    <div className="container notification-bar-content">
                    {this.props.notification && this.props.notification.current && <span className="notification-bar-message">{this.props.notification.current.message}</span>}
                    <button onClick={this.onClose} type="button" className="notification-bar-close close" aria-label="Close">
                        <span>&times;</span>
                    </button>
                    </div>
                </div>
        </div>;
    };
};