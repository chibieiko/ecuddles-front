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

    onQuantityChange = (product, quantity) => {
        console.log("product: " + product + ", quantity: " + quantity);
    };

    render() {
        return <div>
            {
                this.props.entries.map(entry => {
                    return <div key={entry.product.id}>
                        <CartItem onQuantityChange={this.props.changeQuantity} entry={entry}/>
                        <hr/>
                    </div>;
                })
            }
        </div>;
    };
};
