import {Component} from 'react';
import ProductForm from './ProductForm';

export default class AddProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            price: 0,
            fabric: "",
            filling: "",
            designer: "",
            height: 0,
            width: 0,
            length: 0,
            weight: 0,
            disposeInstructions: "",
            stock: 0,
            color: "",
            careInstructions: "",
            categories: [],
            pictures: []
        }
    }

    checkInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    };

    submitForm = (event) => {
        event.preventDefault();

        console.log(this.state);
    };
//for modify give product={product} to fill form with values
    render() {
        return <div>
            <h3>Add a product</h3>

            <ProductForm checkInput={this.checkInput}
                         submitForm={this.submitForm}/>

        </div>
    }
}