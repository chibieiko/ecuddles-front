import {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../stylesheets/productCard.scss';

export default class ProductCard extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div className="col-xs-6 col-lg-4">
            <div className="panel panel-default">
                <div className="col-xs-12">
                    <img src={this.props.product.picture.url}
                         alt={this.props.product.picture.caption}/>
                </div>
                <div className="panel-body">
                    <h4>{this.props.product.name}</h4>
                    <h4>{this.props.product.price} €</h4>
                    <button className="btn btn-success">
                        <span className="glyphicon glyphicon-shopping-cart"/> Add to cart
                    </button>
                </div>
            </div>
        </div>;
    };
}