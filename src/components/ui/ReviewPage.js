import {Component} from 'react';
import ReviewCard from './ReviewCard';
import Spinner from './Spinner';
import connector from '../../connector';
import '../../stylesheets/reviewPage.scss';

export default class ReviewPage extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            fetching: false,
            reviews: []
        };
    };

    componentDidMount() {
        this.loadReviews();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
            this.loadReviews();
        }
    }

    // Defines a proper url and gets reviews from server.
    loadReviews = () => {
        this.setState({
            fetching: true
        });

        let url = "/products/" + this.props.match.params.id + "?projection=inspect";

        connector(url)
            .then(response => {
                let product = response;

                this.setState({
                    fetching: false,
                    reviews: product.reviews ? product.reviews : []
                });
            })
            .catch(() => {
                this.setState({
                    fetching: false
                });
            });
    };

    deleteReview = (event) => {
        event.preventDefault();

        connector("/products/" + this.props.match.params.id + "/reviews", {
            auth: true,
            delete: true
        })
            .then(response => {
                let reviews = this.state.reviews.filter((review) => {
                    return review.id !== response.id
                });

                this.setState({
                    reviews: reviews
                })
            })
    };

    render() {
        return <div>

            {
                this.state.fetching ?
                    <Spinner margin={true}/> :
                    <div>
                        <div className="row">
                            <div className="col-xs-6">
                                <button
                                    className="btn btn-default bottom-breather"
                                    onClick={() => this.props.history.goBack()}>
                                    <span className="glyphicon glyphicon-arrow-left"/> <span className="hidden-xs">Return to product</span>
                                </button>
                            </div>
                            <div className="col-xs-6">
                                {
                                    this.props.authentication.loggedIn ?
                                        <button
                                            className="btn btn-success pull-right bottom-breather"
                                            onClick={() => this.props.history.push("add")}>
                                            Add review
                                        </button>
                                        :
                                        <button
                                            className="btn btn-success pull-right"
                                            onClick={this.props.onReviewAddError}>
                                            Add review
                                        </button>
                                }
                            </div>
                        </div>

                        {
                            this.state.reviews.length > 0 ?
                                this.state.reviews.map(review =>
                                    <ReviewCard key={review.id}
                                                review={review}
                                                user={this.props.authentication.user}
                                                deleteReview={this.deleteReview}/>) :
                                <div className="row">
                                    <div className="col-xs-12">
                                        <h3>No reviews for this product. Go
                                            ahead
                                            and add one!</h3>
                                    </div>
                                </div>
                        }

                    </div>
            }

        </div>
    }
}