import {Component} from 'react';
import '../../stylesheets/categoryList.scss';

export default class CartPage extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div>
            {
                this.props.cart.length > 0 ?
                    <div>
                        <ul>
                            {
                                this.props.cart.map(entry => {
                                    return <li>{entry.product.name} - {entry.quantity} pieces</li>;
                                })
                            }
                        </ul>
                        <button className="btn btn-danger" onClick={this.props.clearCart}>Clear</button>
                    </div>
                :
                <div><h2>There are no items in shopping cart.</h2></div>
                }
        </div>;
    };
};
