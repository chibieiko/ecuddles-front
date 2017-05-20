import {Component} from 'react';
import '../../stylesheets/imageViewer.scss';

export default class ImageViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        }
    };

    render() {
        return <div className="image-viewer row">
            <div className="image-viewer-selected-image-container col-xs-12 align-center">
                <img className="image-viewer-selected-image align-center center-block"
                     src={this.props.images[this.state.activeIndex].url}
                     alt="Full size product image"/>
            </div>

            <div className="image-viewer-thumbnail-images col-xs-12">
                {this.props.images.map((img, index) => (
                    <img key={index} onClick={() => {this.setState({activeIndex: index})}} src={img.url} alt="Thumbnail" className="image-viewer-thumbnail"/>
                    ))}
            </div>
        </div>;
    };
};
