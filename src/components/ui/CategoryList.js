import {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import MainPage from "./MainPage";
import ProductPage from "./ProductPage";
import SearchPage from "./SearchPage";

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div>
            Categories are here
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route path="/product" component={ProductPage}/>
                <Route path="/search" component={SearchPage}/>
            </Switch>
        </div>;
    };
};