import {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../stylesheets/productCard.scss';

export default class ProductCard extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div className="col-xs-6 col-sm-4 col-lg-3 card">
            <Link to={'/product/' + this.props.product.id}>
                <div className="panel panel-default picture-box">
                    <div className="panel-body">
                        <div className="col-xs-12 image align-center">
                            <img src={this.props.product.picture.url}
                                 alt={this.props.product.picture.caption}
                                 className="align-center center-block"/>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="row">
                <Link to={'/product/' + this.props.product.id}>
                <div className="col-xs-12">
                        <p className="product-name">{this.props.product.name}</p>
                </div>
                </Link>

                <div className="col-xs-12">
                    <p className="price">{this.props.product.price} €</p>
                </div>
                <div className="col-xs-12">
                    <Link to={'/product/' + this.props.product.id}>
                        <button className="btn btn-xs btn-success">
                            <span className="glyphicon glyphicon-shopping-cart"/> Add to cart
                        </button>
                    </Link>
                </div>
            </div>
        </div>;
    };
}