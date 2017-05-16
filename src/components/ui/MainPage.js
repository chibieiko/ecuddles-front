import {Component} from 'react';
import ProductList from './ProductList';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
    };

    render() {
        return <div>
            {
                this.props.match.params.id ?
                <ProductList search={this.state.search} category={this.props.match.params.id}/> :
                    <ProductList search={this.state.search}/>
            }
        </div>;
    };
};