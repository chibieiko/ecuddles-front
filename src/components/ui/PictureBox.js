import {Component} from 'react';
import '../../stylesheets/pictureBox.scss';

export default class PictureBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="panel panel-default picture-box">
            <div className="panel-body">
                {
                    this.props.onRemove &&
                    <div className="delete-button" onClick={this.props.onRemove}>
                        <span className="glyphicon glyphicon-remove"/>
                    </div>
                }
                <div className="col-xs-12 image align-center">
                    <img src={this.props.picture.url}
                         alt={this.props.picture.caption}
                         className="align-center center-block"/>
                </div>
            </div>
        </div>
    }
}