import {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../stylesheets/cart.scss';

export default class CartItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: this.props.entry.quantity || 1
        };
    };

    onChange = (e) => {
        let value = parseInt(e.target.value);

        this.setState({
            quantity: isNaN(value) ?
                ""
                :
                value <= 0 ?
                    0
                    :
                    value > this.props.entry.product.stock ?
                        this.props.entry.product.stock
                        :
                        value
        });
    };

    onBlur = () => {
        let quantity = parseInt(this.state.quantity);

        if (isNaN(quantity) || quantity <= 0) {
            this.props.deleteProduct(this.props.entry.product.id);
        } else {
            this.props.changeQuantity(this.props.entry.product.id, quantity);
        }
    };

    onDelete = () => {
        this.props.deleteProduct(this.props.entry.product.id);
    };

    render() {
        let product = this.props.entry.product;
        let quantity = this.props.entry.quantity;

        return <div className="cart-item">
            <div className="cart-item-col cart-item-col-thumbnail">
                <Link to={'/product/' + product.id}>
                    <img className="cart-item-thumbnail"
                         src={product.pictures[0].url}
                         alt={product.pictures[0].caption}/>
                </Link>
            </div>
            <div className="cart-item-col cart-item-col-details">
                <div className="cart-item-name"><Link to={'/product/' + product.id}>{product.name}</Link></div>
                <div className="cart-item-price">{product.price}€</div>
                {
                    product.stock > 0 ?
                        <span><span className="icon-margin icon-green glyphicon glyphicon-ok"/>{product.stock} available</span>
                        :
                        <span><span className="icon-margin icon-red glyphicon glyphicon-remove"/> Out of stock</span>
                }
            </div>
            <div className="cart-item-col cart-item-col-total-price">
                <div className="input-group cart-item-quantity">
                    <input type="number"
                           className="form-control"
                           min="1" max={product.stock}
                           value={this.state.quantity}
                           onChange={this.onChange}
                           onBlur={this.onBlur}/>
                    <div className="input-group-btn">
                        <button className="btn btn-default" onClick={this.onDelete}>
                            <i className="glyphicon glyphicon-trash"/>
                        </button>
                    </div>
                </div>
                {(product.price * quantity).toFixed(2)} €
            </div>
        </div>;
    }
}
