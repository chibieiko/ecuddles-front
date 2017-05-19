import {Component} from 'react';
import ReviewCard from './ReviewCard';
import {Link} from 'react-router-dom';
import connector from '../../connector';
import '../../stylesheets/productReview.scss';

export default class ProductReview extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
        }
    }

    deleteReview = (event) => {
        event.preventDefault();

        connector("/products/" + this.props.product.id + "/reviews", {auth: true, delete: true})
            .then(response => {
                console.log(response);
                let reviews = this.state.reviews.filter((review) => {
                    return review.id !== response.id
                });

                this.setState({
                    reviews: reviews
                })
            })
    };

    render() {

        let reviews = this.props.product.reviews;

        return <div>
            <hr/>
            <div className="row bottom-breather">
                <div className="col-xs-6">
                    <h4>Latest review</h4>
                </div>
                <div className="col-xs-6">
                    {
                        this.props.authentication.loggedIn ?
                            <button className="btn btn-success pull-right" onClick={() => this.props.history.push(this.props.product.name + "/reviews/add")}>
                                Add review
                            </button>
                            :
                            <button className="btn btn-success pull-right" onClick={this.props.onReviewAddError}>
                                Add review
                            </button>
                    }

                </div>
            </div>

            {
                reviews.length > 0 ?
                        <ReviewCard key={reviews[0].id} review={reviews[0]}
                                    user={this.props.user}
                        product={this.props.product.id}
                        deleteReview={this.deleteReview}/> :
                    <p>No reviews for this product, go ahead and add one!</p>
            }
            {
                reviews.length > 1 &&
                <div className="row">
                    <div className="col-xs-12">
                        <Link to={'/product/' + this.props.product.id + "/" + this.props.product.name + "/reviews"}
                              className="pull-right bottom-breather">
                            View all reviews
                        </Link>
                    </div>
                </div>
            }
        </div>
    }
}