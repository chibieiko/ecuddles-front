import '../../stylesheets/spinner.scss';
import {Component} from 'react';

export default class Spinner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        this.mounted = true;

        setTimeout(() => {
            if (this.mounted) {
                this.setState({visible: true})
            }
        }, this.props.delay);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        let margin =  this.props.margin ? "auto" : 0;
        let size = this.props.size || 18;

        let bounceStyle = {
            width: size,
            height: size
        };

        let containerStyle = {
            marginLeft: margin,
            marginRight: margin,
            width: size * 3
        };

        return this.state.visible && <div style={containerStyle} className="spinner">
            <div style={bounceStyle} className="bounce1"></div>
            <div style={bounceStyle} className="bounce2"></div>
            <div style={bounceStyle} className="bounce3"></div>
        </div>;
    }
}
