import {Component} from 'react';
import connector from '../../connector';
import ProductCard from './ProductCard';
import FlameThrower from '../../flameThrower';
import Spinner from './Spinner';

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: {
                number: 0
            },
            fetching: false,
            products: []
        };
    };

    componentDidMount() {
        this.loadProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
            this.loadProducts();
        }
    }

    loadProducts = () => {
        this.setState({
            fetching: true
        });

        let url;

        if (this.props.search) {
            console.log("SEARCHING");
            this.setState({
                page: {
                    number: 0
                }
            }, () => {
                url = "/products/search/contains/?name=" + this.props.search +
                    "&page=" + this.state.page.number;
                this.getProducts(url);
            });

        } else if (this.props.category) {
            console.log("I HAVE A CATEGORY");
            this.setState({
                page: {
                    number: 0
                }
            }, () => {
                url = "/products/search/has?categoryid=" + this.props.category + "&page=" + this.state.page.number;
                this.getProducts(url);
            });
        } else {
            console.log("default url");
            url = "/products/search/has?categoryid=1&page=" + this.state.page.number;
            this.getProducts(url);
        }
    };

    getProducts = (url) => {
        console.log("getting products with url: ", url);
        connector(url)
            .then(response => {
                let products = response._embedded.products;
                let page = response.page;

                this.setState({
                    fetching: false,
                    products: products ? products : [],
                    page: page
                });
            })
            .catch(() => {
                this.setState({
                    fetching: false
                });
            });
    };

    nextPage = () => {
        if (this.state.page.number < this.state.page.totalPages - 1) {
            let pageNum = this.state.page.number + 1;
            this.setState({
                page: {
                    number: pageNum
                }
            }, () => {
                console.log("page number next:::", this.state.page.number);
                this.loadProducts();
            });
        }
    };

    previousPage = () => {
        if (this.state.page.number > 0) {
            let pageNum = this.state.page.number - 1;
            this.setState({
                page: {
                    number: pageNum
                }
            }, this.loadProducts);
        }
    };

    render() {
        return <div>
            <h1>Latest additions to our cuddly family</h1>
            {
                this.state.fetching ?
                    <Spinner margin={true}/> :
                    this.state.products.map(product => <ProductCard
                        key={product.id} product={product}/>)
            }
            <div className="col-xs-12">
                <nav aria-label="Product page navigation">
                    <ul className="pager">
                        <li className="previous">
                            <a onClick={this.previousPage}>
                                <span className="hidden-xs">Previous page</span>
                                <span className="glyphicon glyphicon-arrow-left hidden-lg hidden-md hidden-sm col-xs-1"/>
                            </a>
                        </li>

                        <li className="next">
                            <a onClick={this.nextPage}>
                                <span className="hidden-xs">Next page</span>
                                <span className="glyphicon glyphicon-arrow-right hidden-lg hidden-md hidden-sm col-xs-1"/>
                            </a>
                        </li>
                    </ul>
                </nav>
                <p>total pages: {this.state.page.totalPages}</p>
                <p>total elements: {this.state.page.totalElements}</p>
                <p>current page: {this.state.page.number}</p>
            </div>
        </div>;
    };
};