import {Component} from 'react';
import ProductForm from '../containers/ProductForm';

export default class AddProductPage extends Component {
    constructor(props) {
        super(props);
    }

    submitForm = (product) => {
        console.log(product);
    };

    //for modify give product={product} to fill form with values
    render() {
        return <div>
            <h3>Add a product</h3>
            <ProductForm onSubmit={this.submitForm}/>
        </div>
    }
}