import {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import MainPage from "./MainPage";
import ProductPage from "./ProductPage";
import SearchPage from "./SearchPage";
import '../../stylesheets/categoryList.scss';

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div className="row">
            <div className="col-sm-3 sidebar-offcanvas hidden-xs" id="sidebar"
                 role="navigation">
                <ul className="nav">
                    <li><a className="link-color">Link1</a></li>
                    <li><a className="link-color">Link2</a></li>
                    <li><a className="link-color">Link3</a></li>
                </ul>
            </div>
            <div className="col-xs-12 col-sm-9">
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/product" component={ProductPage}/>
                    <Route path="/search" component={SearchPage}/>
                </Switch>
            </div>
        </div>;
    };
};