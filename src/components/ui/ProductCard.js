import {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../stylesheets/productCard.scss';

export default class ProductCard extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div className="col-xs-6 col-lg-4 card">
                <div className="col-xs-12">
                    <img src={this.props.product.picture.url}
                         alt={this.props.product.picture.caption}/>
                </div>

                <div className="col-xs-6">
                    <p>{this.props.product.name}</p>
                </div>

                <div className="col-xs-6">
                    <p className="pull-right">{this.props.product.price} €</p>
                </div>

                <div className="col-xs-12">
                    <button className="btn btn-success">
                        <span className="glyphicon glyphicon-shopping-cart"/>
                        Add to
                        cart
                    </button>
                </div>
            </div>;
    };
}