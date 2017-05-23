import {Component} from 'react';
import {Link} from 'react-router-dom';
import PictureBox from './PictureBox';
import '../../stylesheets/productCard.scss';

export default class ProductCard extends Component {
    constructor(props) {
        super(props);

        let quantity = 0;

        if (this.props.cart) {
            this.props.cart.forEach(cartEntry => {
                if (cartEntry.product.id === this.props.product.id) {
                    quantity = cartEntry.quantity;
                }
            });
        }

        this.state = {
            quantity: quantity
        };
    };

    addToCart = () => {
        this.props.addToCart({
            product: this.props.product.id,
            quantity: this.state.quantity + 1
        });
    };

    render() {
        return <div className="col-xs-6 col-sm-4 col-lg-3 card">
            <Link
                to={'/product/' + this.props.product.id + "/" + this.props.product.name}>
                <PictureBox picture={this.props.product.picture}/>

            <div className="row">

                    <div className="col-xs-12">
                        <p className="product-name">{this.props.product.name}</p>
                    </div>

                    <div className="col-xs-12">
                        <p className="price">{this.props.product.price} €</p>
                    </div>

        </div>
            </Link>
                <div className="row">
                <div className="col-xs-12">
                    <button onClick={this.addToCart}
                            disabled={!(this.props.product.stock > 0 && this.props.product.stock > this.state.quantity)}
                            className={
                                this.props.product.stock > 0 && this.props.product.stock > this.state.quantity ?
                                    "btn btn-xs btn-success"
                                    :
                                    "btn btn-xs btn-success disabled"
                            }>
                        {
                            this.props.product.stock > 0 && this.props.product.stock > this.state.quantity ?
                                <span><span className="glyphicon glyphicon-shopping-cart"/>&nbsp;Add&nbsp;to&nbsp;cart</span>
                                :
                                <span><span className="glyphicon glyphicon-remove"/>&nbsp;Out&nbsp;of&nbsp;stock</span>
                        }
                    </button>
                </div>

            </div>
        </div>;
    };
}