import {Component} from 'react';
import ProductList from './ProductList';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div>
            <ProductList search=""/>
        </div>;
    };
};