import {Component} from 'react';
import ProductList from '../containers/ProductList';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div>
            <ProductList search={this.props.search}
                         category={this.props.match.params.id}/>
        </div>;
    };
};