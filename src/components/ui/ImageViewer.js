/**
 * Created by vili on 07/05/2017.
 */

import {Component} from 'react';
import '../../stylesheets/imageViewer.scss';

export default class ImageViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        }
    };

    viewIndex = (index) => {
        this.setState({
            activeIndex: index
        });
    };

    render() {
        return <div className="image-viewer">
            <div className="image-viewer-selected-image-container">
                <img className="image-viewer-selected-image" src={this.props.images[this.state.activeIndex].url} alt="Big image"/>
            </div>

            <div className="image-viewer-thumbnail-images">
                {this.props.images.map((img, index) => (
                    <img key={index} onClick={() => {this.setState({activeIndex: index})}} src={img.url} alt="Thumbnail" className="image-viewer-thumbnail"/>
                    ))}
            </div>
        </div>;
    };
};
