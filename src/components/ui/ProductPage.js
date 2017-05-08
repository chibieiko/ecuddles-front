import {Component} from 'react';
import Spinner from './Spinner';
import FlameThrower from '../../flameThrower';
import ImageViewer from './ImageViewer';
import Stars from './Stars';
import '../../stylesheets/product.scss';

const ListDetail = (props) => (
    <li className="list-group-item">
        <div className="text-info">{props.name}</div>
        {props.value}
    </li>
);

const Detail = (props) => (
        <div className="product-detail">
            <div className="name">{props.name}</div>
            <span className="value">{props.value}</span>
        </div>
);

export default class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            fetching: false,
            product: null
        };
    };

    componentWillMount() {
        this.loadProductDetails(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.loadProductDetails(nextProps.match.params.id);
    }

    loadProductDetails = productId => {
        this.setState({
            fetching: true,
            error: null
        });

        fetch(backendUrl + "/api/products/" + productId + "?projection=inspect")
            .then(response => {
                this.setState({
                    fetching: false
                });

                FlameThrower.burn(response);
                return response.json();
            })
            .then(response => {
                this.setState({
                    product: response
                });
            })
            .catch(error => {
                this.setState({
                    error: error
                });
            });
    };

    render() {
        let product = this.state.product;

        return <div className="row">
            <div className="col-sm-offset-3 col-sm-9">
                {
                    this.state.error &&
                    <div className="alert alert-danger">
                        {this.state.error.message}
                    </div>
                }

                {
                    this.state.fetching &&
                    <Spinner margin={true} delay={500}/>
                }

                {
                    product &&
                    <div>
                        <div className="row">
                            <div className="col-xs-12">
                                <h3>
                                    {product.name}
                                </h3>
                                <Stars rating={4.4}/> 4.4 / 5
                            </div>
                        </div>
                        <div className="row product-page-row">
                            <div className="col-sm-8 breather-bottom-20">
                                <ImageViewer images={product.pictures}/>
                            </div>
                            <div className="col-sm-4">
                                <div className="panel panel-default buy-panel">
                                    <div className="panel-body">
                                        <span className="product-price">{product.price}€</span>
                                        <button className={
                                            product.stock > 0 ?
                                                "btn-buy center-block btn btn-lg btn-success"
                                                :
                                                "btn-buy center-block btn btn-lg btn-success disabled"
                                        }>
                                            Add to cart
                                        </button>
                                        <br/>
                                        {
                                            product.stock > 0 ?
                                                <span>
                                                    <span
                                                        className="icon-margin icon-green glyphicon glyphicon-ok"/>
                                                    {product.stock} available
                                                </span>
                                                :
                                                <span>
                                                    <span className="icon-margin icon-red glyphicon glyphicon-remove"/>
                                                    Out of stock
                                                </span>
                                        }
                                    </div>
                                </div>

                                <ul className="list-group">
                                    <ListDetail name="Height" value={product.height + " cm"}/>
                                    <ListDetail name="Fabric" value={product.fabric}/>
                                    <ListDetail name="Filling" value={product.filling}/>
                                </ul>
                            </div>
                        </div>
                        <div className="row product-page-row">
                            <div className="col-xs-12">
                                {product.description}
                            </div>

                            <div className="col-xs-12 breather-bottom">
                                <hr/>
                                <h4>More details</h4>
                            </div>

                            <div className="col-sm-6">
                                <Detail name="Color" value={product.color}/>
                                <Detail name="Designer" value={product.designer}/>
                                <Detail name="Width" value={product.width + " cm"}/>
                                <Detail name="Length" value={product.length + " cm"}/>
                                <Detail name="Weight" value={product.weight + " kg"}/>
                            </div>

                            <div className="col-sm-6">
                                <Detail name="Care instructions" value={product.careInstructions}/>
                                <Detail name="Dispose instructions" value={product.disposeInstructions}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>;
    };
};