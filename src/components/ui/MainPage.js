import {Component} from 'react';
import ProductList from '../containers/ProductList';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
    };

    render() {
        return <div>
            <ProductList search={this.state.search}
                         category={this.props.match.params.id}/>
        </div>;
    };
};