import {Component} from 'react';
import ProductForm from '../containers/ProductForm';
import connector from '../../connector';

export default class AddProductPage extends Component {
    constructor(props) {
        super(props);
    }

    submitForm = (product) => {
        connector('/products',
            {
                post: product,
                auth: true,
                successNotification: "Successfully added product to eCuddles!"
            })
            .then(() => {
                this.props.history.push('/');
            });
    };

    //for modify give product={product} to fill form with values
    render() {
        return <div>
            <h3>Add a product</h3>
            <ProductForm onSubmit={this.submitForm}/>
        </div>
    }
}