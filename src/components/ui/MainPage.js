import {Component} from 'react';
import ProductList from '../containers/ProductList';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div>
            <ProductList category={this.props.match.params.id}/>
        </div>;
    };
};