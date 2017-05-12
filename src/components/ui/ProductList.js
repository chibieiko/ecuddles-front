import {Component} from 'react';
import fetch from 'isomorphic-fetch';
import ProductCard from './ProductCard';
import FlameThrower from '../../flameThrower';
import Spinner from './Spinner';

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            fetching: false,
            products: [],
            error: null
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
            fetching: true,
            error: null
        });

        let url = "";

        if (this.props.category) {
            url = backendUrl + "/api/categories/" + this.props.category;
        } else {
            url = backendUrl + "/api/products/search/contains/?name=" + this.props.search + "&page=" + this.state.page;
        }

        fetch(url)
            .then(response => FlameThrower.burn(response))
            .then(response => {
                let products = response._embedded.products;

                this.setState({
                    fetching: false,
                    products: products ? products : []
                });
            })
            .catch(error => {
                this.setState({
                    fetching: false,
                    error: error
                });
            });
    };

    render() {
        return <div>
            <h1>Latest additions to our cuddly family</h1>
            {
                this.state.error &&
                <div className="alert alert-danger">
                    {this.state.error.message}
                </div>
            }
            {
                this.state.fetching ?
                    <Spinner margin={true}/> :
                    this.state.products.map(product => <ProductCard key={product.id} product={product}/>)
            }
        </div>;
    };
};