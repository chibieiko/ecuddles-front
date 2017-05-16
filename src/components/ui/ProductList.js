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
            pages: [],
            fetching: false,
            products: []
        };
    };

    componentDidMount() {
        this.resetPage();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
            this.resetPage();
        }
    }

    // Resets page number if necessary i.e user clicked on different category.
    resetPage = () => {
        this.setState({
            page: {
                number: 0
            }
        }, this.loadProducts)
    };

    // Defines a proper url and gets products form server.
    loadProducts = () => {
        this.setState({
            fetching: true
        });

        let url;

        if (this.props.search) {
            console.log("SEARCHING");

            url = "/products/search/contains/?name=" + this.props.search +
                "&page=" + this.state.page.number;

        } else if (this.props.category) {
            console.log("I HAVE A CATEGORY ", this.props.category);

            url = "/products/search/has?categoryid=" + this.props.category + "&page=" + this.state.page.number;

        } else {
            console.log("default url");

            url = "/products/search/has?categoryid=1&page=" + this.state.page.number;
        }

        this.getProducts(url);
    };

    getProducts = (url) => {
        console.log("getting products with url: ", url);

        connector(url)
            .then(response => {
                let products = response._embedded.products;
                let page = response.page;
                let pages = [];
                for (let i = 0; i < page.totalPages; i++) {
                    pages.push(i + 1);
                }

                this.setState({
                    fetching: false,
                    products: products ? products : [],
                    page: page,
                    pages: pages
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

    jumpToPage = (pageNum) => {
        this.setState({
            page: {
                number: pageNum
            }
        }, this.loadProducts)
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
                                <span
                                    className="glyphicon glyphicon-arrow-left hidden-lg hidden-md hidden-sm col-xs-1"/>
                            </a>
                        </li>
                        <span className="dropup">
                            <button className="btn btn-default dropdown-toggle"
                                    type="button" id="pageMenu"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                {this.state.page.number} <span
                                className="caret"/>
                            </button>

                            <ul className="dropdown-menu"
                                aria-labelledby="pageMenu">
                                {
                                    this.state.pages && this.state.pages.map(pageNum =>
                                        <li key={pageNum}><a>{pageNum}</a></li>)
                                }
                            </ul>
                        </span> / {this.state.page.totalPages}
                        <li className="next">
                            <a onClick={this.nextPage}>
                                <span className="hidden-xs">Next page</span>
                                <span
                                    className="glyphicon glyphicon-arrow-right hidden-lg hidden-md hidden-sm col-xs-1"/>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>;
    };
};