import {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../stylesheets/productCard.scss';

export default class ProductCard extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div className="col-xs-6 col-sm-4 col-lg-3 card">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="col-xs-12 image vertical-center">
                        <img src={this.props.product.picture.url}
                             alt={this.props.product.picture.caption}
                             className="vertical-center center-block"/>
                    </div>
                </div>
            </div>

            <div className="col-xs-12 product-name">
                <p>{this.props.product.name}</p>
            </div>

            <div className="col-xs-12 price">
                <p>{this.props.product.price} €</p>
            </div>

            <div className="col-xs-12">
                <button className="btn btn-success">
                    <span className="glyphicon glyphicon-shopping-cart"/> <span className="hidden-xs">Add to cart</span>
                </button>
            </div>
        </div>;
    };
}