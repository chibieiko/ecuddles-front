import {Component} from 'react';
import Spinner from './Spinner';

export default class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            product: null
        };

        console.log(props);
    };

    render() {
        return <div>
            {
                this.state.fetching || !this.state.product ?
                    <Spinner margin={true}/>
                    :
                    <h1>
                        {this.state.product.name}
                    </h1>
            }
        </div>;
    };
};