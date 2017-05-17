import {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import MainPage from "./MainPage";
import ProductPage from "../containers/ProductPage";
import SearchPage from "./SearchPage";
import '../../stylesheets/categoryList.scss';

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.loadCategories();
    }

    render() {
        return <div className="row">
            <div className="col-sm-3 sidebar-offcanvas hidden-xs"
                 id="sidebar"
                 role="navigation">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Categories
                    </div>
                    <div className="panel-body">
                        <ul className="nav">
                            {
                                this.props.categories && this.props.categories.map(category =>
                                    <li key={category.id} className={this.props.location.pathname === "/category/" + category.id + "/" + category.name ? "active-category-link" : "category-link"}>
                                        <Link to={'/category/' + category.id + '/' + category.name}>
                                            {category.name}
                                        </Link>
                                    </li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-9">
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/category/:id/:name" component={MainPage}/>
                    <Route path="/product/:id" component={ProductPage}/>
                    <Route path="/search" component={SearchPage}/>
                </Switch>
            </div>
        </div>;
    };
};