import {Component} from 'react';
import {Route} from 'react-router-dom';
import ProductList from '../containers/ProductList';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div>
            <Route exact path="/search" render={() => (
                <ProductList search=""/>
            )}/>
            <Route path="/search/:search" render={props => {
                return <ProductList search={props.match.params.search}/>;
            }}/>
        </div>;
    };
};