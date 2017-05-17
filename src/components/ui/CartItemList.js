/**
 * Created by vili on 17/05/2017.
 */
import {Component} from 'react';
import {Link} from 'react-router-dom';
import CartItem from '../containers/CartItem';
import '../../stylesheets/cart.scss';

export default class CartItemList extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        let empty = this.props.entries.length < 1;
        let totalCount = 0;
        let totalPrice = 0;

        this.props.entries.forEach(entry => {
            totalPrice += entry.product.price * entry.quantity;
            totalCount += entry.quantity;
        });

        return <div>
            {
                this.props.entries.map(entry => {
                    return <div key={entry.product.id}>
                        <CartItem entry={entry}/>
                        <hr/>
                    </div>;
                })
            }
            {
                empty ?
                    <div>Your shopping cart is currently empty.</div>
                    :
                    <div className="row">
                        <div className="col-xs-12">
                            <span className="pull-right">
                                Total: <span className="cart-total-price">{totalPrice} €</span>
                            </span>
                        </div>
                    </div>

            }
            <hr/>
            <div className="row">
                <div className="col-xs-12">
                    <button className={
                        empty ?
                            "btn btn-success pull-right disabled"
                            :
                            "btn btn-success pull-right"
                    }>
                        Continue
                    </button>
                </div>
            </div>
        </div>;
    };
};
