import {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Product extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div>
            (Product ::: {this.props.product.name})
        </div>;
    };
};