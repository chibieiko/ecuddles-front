import {Component} from 'react';
import '../../stylesheets/stars.scss';

export default class Stars extends Component {
    constructor(props) {
        super(props);

        let stars = [];

        for (let i = 0; i < 5; i++) {
            let addClass = i < Math.round(this.props.rating) ? "star-filled" : "star-empty";

            stars.push(
                <span key={i} className={"star " + addClass + " glyphicon glyphicon-star"}/>
            );
        }

        this.state = {
            stars: stars
        };
    };

    render() {
        return <span className="star-container">
            {
                this.state.stars
            }
        </span>;
    };
};
