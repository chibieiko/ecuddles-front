import {Component} from 'react';
import '../../stylesheets/cart.scss';
import CartProgressBar from './CartProgressBar';
import CartItemList from './CartItemList';

export default class CartPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 1
        }
    };

    render() {
        return <div>
            <CartProgressBar steps={["Cart", "Information", "Payment"]} current={this.state.current}/>
            <hr/>
            {
                this.props.cart.length > 0 ?
                    <CartItemList entries={this.props.cart}/>
                    :
                    <div>No items in the shopping cart</div>
            }
        </div>;
    };
};
