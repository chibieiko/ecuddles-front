import {Component} from 'react';
import ProductList from './ProductList';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };

        if(this.props) {
            console.log(this.props.location.state)
        }
    };

    render() {
        return <div>
            {
                this.props.location.state ?
                <ProductList search={this.state.search} category={this.props.location.state.category}/> :
                    <ProductList search={this.state.search}/>
            }
        </div>;
    };
};