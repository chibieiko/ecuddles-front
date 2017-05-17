import {Component} from 'react';
import connector from '../../connector';
import ProductCard from './ProductCard';
import FlameThrower from '../../flameThrower';
import Spinner from './Spinner';

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

        let url = "";

        if (this.props.category) {
            url = "/categories/" + this.props.category;
        } else {
            url = "/products/search/contains/?name=" + this.props.search + "&page=" + this.state.page;
        }

        connector(url)
            .then(response => {
                let products = response._embedded.products;

                this.setState({
                    fetching: false,
                    products: products ? products : []
                });
            })
            .catch(() => {
                this.setState({
                    fetching: false
                });
            });
    };

    render() {
        return <div>
            <h1>Latest additions to our cuddly family</h1>
            {
                this.state.fetching ?
                    <Spinner margin={true}/> :
                    this.state.products.map(product => <ProductCard key={product.id} product={product}/>)
            }
        </div>;
    };
};