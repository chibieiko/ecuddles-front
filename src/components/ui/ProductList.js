import {Component} from 'react';
import connector from '../../connector';
import ProductCard from './ProductCard';
import ProductListSort from './ProductListSort';
import Spinner from './Spinner';
import Pagination from './Pagination';

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: {
                number: 0,
                pages: []
            },
            fetching: false,
            products: []
        };
    };

    componentDidMount() {
        console.log(this.props.category);
        this.resetPage();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
            console.log(nextProps);
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

    // Defines a proper url and gets products from server.
    loadProducts = () => {
        this.setState({
            fetching: true
        });

        let url;

        if (this.props.search) {
            console.log("SEARCHING");

            url = "/products/search/contains/?name=" + this.props.search +
                "&page=" + this.state.page.number;

        } else {
            let categoryId = 1;
            if (this.props.category) {
                categoryId = this.props.category;
            }

            url = "/products/search/has?categoryid=" + categoryId + "&page=" + this.state.page.number;

            if (this.state.sort) {
                url += "&sort=" + this.state.sort.on + "," + this.state.sort.order;
            } else {
                url += "&sort=date";
            }
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

                page.pages = pages;

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

    // Jumps to a specific page.
    jumpToPage = (pageNum) => {
        this.setState({
            page: {
                number: pageNum - 1
            }
        }, this.loadProducts)
    };

    sortProducts = (sort, order, sortButtonText) => {
        this.setState({
            sort: {
                on: sort,
                order: order,
                buttonName: sortButtonText
            }
        }, this.loadProducts)
    };

    render() {
        return <div>
            {
                this.state.fetching ?
                    <Spinner margin={true}/> :
                    <div>
                        <ProductListSort sortProducts={this.sortProducts} buttonName={this.state.sort ? this.state.sort.buttonName : 'Newest first'}/>

                        {
                            this.state.products.map(product => <ProductCard
                                key={product.id} product={product}/>)
                        }
                        <Pagination jumpToPage={this.jumpToPage} previousPage={this.previousPage}
                                    nextPage={this.nextPage} page={this.state.page}/>
                    </div>
            }
        </div>;
    };
};