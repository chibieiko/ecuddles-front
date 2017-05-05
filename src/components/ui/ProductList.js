import {Component} from 'react';
import {Link} from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import Product from './Product';

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
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

        if (this.props.category) {
            fetch(backendUrl + "/api/categories/" + this.props.category)
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        fetching: false,
                        products: response._embedded.products
                    });
                });
        } else {
            console.log(this.props.search);
            fetch(backendUrl + "/api/products/search/contains/?name=" + this.props.search + "&page=" + this.state.page)
                .then(response => response.json())
                .then(response => {
                    let products = response._embedded.products;

                    this.setState({
                        fetching: false,
                        products: products ? products : []
                    });
                });
        }
    };

    render() {
        return <div>
            {this.state.fetching ? "Spinner is here!" : this.state.products.map(product => <Product product={product}/>)}
        </div>;
    };
};