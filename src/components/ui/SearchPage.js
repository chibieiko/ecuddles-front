import {Component} from 'react';
import {Route} from 'react-router-dom';
import ProductList from './ProductList';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div>
            <Route exact path="/search" render={() => (
                <ProductList search=""/>
            )}/>
            <Route path="/search/:search" render={props => {
                console.log(props);
                return <ProductList search={props.match.params.search}/>;
            }}/>
        </div>;
    };
};