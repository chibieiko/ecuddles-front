import {Component} from 'react';
import '../../stylesheets/productListSort.scss';

export default class ProductListSort extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div className="col-xs-12" id="sort-button">
            <div className="btn-group pull-right">
                <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.buttonName} <span className="caret"/>
                </button>
                <ul className="dropdown-menu">
                    <li><a onClick={() => this.props.sortProducts('date', 'desc', 'Newest first')}>Newest first</a></li>
                    <li><a onClick={() => this.props.sortProducts('price', 'asc', 'Cheapest first')}>Cheapest first</a></li>
                    <li><a onClick={() => this.props.sortProducts('price', 'desc', 'Most expensive first')}>Most expensive first</a></li>
                </ul>
            </div>
        </div>;
    };
};