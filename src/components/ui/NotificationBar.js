import {Component} from 'react';
import '../../stylesheets/notificationBar.scss';
import C from '../../constants';

export default class NotificationBar extends Component {
    constructor(props) {
        super(props);
    };

    onClose = () => {
        this.props.onClose(this.props.notification);
    };

    render() {
        return <div className="notification-bar-container">
            {
                this.props.notification &&
                <Notification data={this.props.notification}
                              onClose={this.onClose}/>
            }
        </div>;
    };
};

const Notification = ({data, onClose}) => {

    let notificationClass = "notification-bar";
    switch (data.current.type) {
        case C.NOTIFICATION_ERROR:
            notificationClass += " notification-bar-error";
            break;

        case C.NOTIFICATION_SUCCESS:
            notificationClass += " notification-bar-success";
            break;
    }

    if (data.visible) {
        notificationClass += " notification-visible"
    }

    return <div
        className={notificationClass}>
        <div className="container notification-bar-content">
            {data.current && <span
                className="notification-bar-message">{data.current.message}</span>}
            <button onClick={onClose} type="button"
                    className="notification-bar-close close" aria-label="Close">
                <span>&times;</span>
            </button>
        </div>
    </div>;
};