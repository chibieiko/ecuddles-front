import {Component} from 'react';
import Spinner from './Spinner';
import ImageViewer from './ImageViewer';
import Stars from './Stars';
import connector from '../../connector';
import ProductReview from '../containers/ProductReview';
import '../../stylesheets/product.scss';

const ListDetail = (props) => (
    <li className="list-group-item">
        <div className="color-gray">{props.name}</div>
        {props.value}
    </li>
);

const Detail = (props) => (
    <div className="product-detail">
        <div className="name color-gray">{props.name}</div>
        <span className="value">{props.value}</span>
    </div>
);

export default class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            product: null,
            quantity: 0
        };
    };

    stopFetching = () => {
        this.setState({
            fetching: false
        });
    };

    startFetching = () => {
        this.setState({
            fetching: true
        });
    };

    buyProduct = () => {
        this.props.addToCart({
            product: this.state.product.id,
            quantity: this.state.quantity + 1
        });
    };

    componentWillMount() {
        this.loadProductDetails(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.loadProductDetails(nextProps.match.params.id);
        }
    }

    notifyMe = () => {
        connector("/notifications/" + this.state.product.id,
            {
                request: {method: "POST"},
                start: this.startFetching,
                stop: this.stopFetching,
                auth: true,
                successNotification: "You will be notified when the product becomes available"
            });
    };

    deleteProduct = () => {
        connector("/products/" + this.state.product.id,
            {
                delete: true,
                auth: true,
                start: this.startFetching,
                stop: this.stopFetching,
                successNotification: "Product deleted successfully"
            })
            .then(response => {
                this.props.history.push("/");
            });
    };

    loadProductDetails = productId => {
        connector("/products/" + productId + "?projection=inspect",
            {
                start: this.startFetching,
                stop: this.stopFetching
            })
            .then(response => {
                let quantity = 0;

                if (this.props.cart) {
                    this.props.cart.forEach(cartEntry => {
                        if (cartEntry.product.id === response.id) {
                            quantity = cartEntry.quantity;
                        }
                    });
                }

                let starsTotal = 0;
                response.reviews.forEach((review) => {
                    starsTotal += review.stars;
                });
                let starAverage = starsTotal / response.reviews.length;

                this.setState({
                    product: response,
                    quantity: quantity,
                    stars: starAverage
                });
            });
    };

    render() {
        let product = this.state.product;

        return <div>
            {
                this.state.error &&
                <div className="alert alert-danger">
                    {this.state.error.message}
                </div>
            }

            {
                this.state.fetching &&
                <Spinner margin={true} delay={0}/>
            }

            {
                product &&
                <div>
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>
                                {product.name}
                            </h3>
                            <Link to={'/product/' + product.id + "/" + product.name + "/reviews"} >
                                <Stars
                                    rating={this.state.stars}/> {this.state.stars ? this.state.stars + " / 5" : "No reviews"}
                            </Link>
                        </div>
                    </div>
                    <div className="row product-page-row">
                        <div className="col-sm-8 breather-bottom-20">
                            <ImageViewer images={product.pictures}/>
                        </div>
                        <div className="col-sm-4">
                            <div className="panel panel-default buy-panel">
                                <div className="panel-body">
                                    <span
                                        className="product-price">{product.price}
                                        €</span>
                                    <button onClick={this.buyProduct}
                                            disabled={!(product.stock > 0 && product.stock > this.state.quantity)}
                                            className={
                                                product.stock > 0 && product.stock > this.state.quantity ?
                                                    "btn-buy center-block btn btn-lg btn-success"
                                                    :
                                                    "btn-buy center-block btn btn-lg btn-success disabled"
                                            }>
                                        Add&nbsp;to&nbsp;cart
                                    </button>
                                    <br/>
                                    {
                                        product.stock > 0 && product.stock > this.state.quantity ?
                                            <div>
                                                    <span
                                                        className="icon-margin icon-green glyphicon glyphicon-ok"/>
                                                {product.stock}&nbsp;available
                                            </div>
                                            :
                                            <div>
                                                <span
                                                    className="icon-margin icon-red glyphicon glyphicon-remove"/>
                                                Out&nbsp;of&nbsp;stock
                                            </div>
                                    }
                                    {
                                        product.stock < 1 &&
                                        <button
                                            className="btn btn-sm btn-success notify-link"
                                            onClick={this.notifyMe}>
                                            <span
                                                className="icon-margin glyphicon glyphicon-envelope"/>Notify&nbsp;me
                                        </button>
                                    }
                                    {
                                        this.state.quantity > 0 &&
                                        <div>
                                            <span
                                                className="icon-margin glyphicon glyphicon-shopping-cart"/>
                                            {this.state.quantity}&nbsp;item{this.state.quantity > 1 && "s"}&nbsp;in&nbsp;cart
                                        </div>
                                    }
                                    {
                                        this.props.role === "ADMIN" &&
                                        <div>
                                            <button
                                                className="btn btn-sm btn-default notify-link"
                                                onClick={() => this.props.history.push('/modify-product/' + product.id + "/" + product.name)}>
                                                <span
                                                    className="icon-margin glyphicon glyphicon-edit"/>
                                                Modify
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger notify-link"
                                                data-toggle="modal"
                                                data-target="#removeModal">
                                                <span
                                                    className="icon-margin glyphicon glyphicon-trash"/>
                                                Delete
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>

                            <ul className="list-group">
                                <ListDetail name="Height"
                                            value={product.height + " cm"}/>
                                <ListDetail name="Fabric"
                                            value={product.fabric}/>
                                <ListDetail name="Filling"
                                            value={product.filling}/>
                            </ul>
                        </div>
                    </div>
                    <div className="row product-page-row">
                        <div className="col-xs-12 col-md-8">
                            {product.description}
                        </div>

                        <div className="col-xs-12 breather-bottom">
                            <hr/>
                            <h4>More details</h4>
                        </div>

                        <div className="col-sm-6">
                            <Detail name="Color" value={product.color}/>
                            <Detail name="Height"
                                    value={product.height + " cm"}/>
                            <Detail name="Width" value={product.width + " cm"}/>
                            <Detail name="Length"
                                    value={product.length + " cm"}/>
                            <Detail name="Weight"
                                    value={product.weight + " kg"}/>
                        </div>

                        <div className="col-sm-6">
                            <Detail name="Fabric"
                                    value={product.fabric}/>
                            <Detail name="Filling"
                                    value={product.filling}/>
                            <Detail name="Care instructions"
                                    value={product.careInstructions}/>
                            <Detail name="Dispose instructions"
                                    value={product.disposeInstructions}/>
                            <Detail name="Designer" value={product.designer}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <ProductReview product={product}
                                           user={this.props.authentication.user}/>
                        </div>
                    </div>
                </div>
            }

            <div className="modal fade" id="removeModal" tabIndex="-1"
                 role="dialog" aria-labelledby="removeModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="removeModalLabel">
                                Delete product</h4>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to permanently delete this
                            product from the store?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default"
                                    data-dismiss="modal">Cancel
                            </button>
                            <button type="button" className="btn btn-danger"
                                    onClick={this.deleteProduct}
                                    data-dismiss="modal">Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>;
    };
};