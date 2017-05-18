import {Component} from 'react';
import ReviewCard from './ReviewCard';
import Spinner from './Spinner';
import connector from '../../connector';

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

        console.log("url:::", url);
        connector(url)
            .then(response => {
                let product = response;
                console.log(product);

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

    render() {
        return <div>

            {
                this.state.fetching ?
                    <Spinner margin={true}/> :
                    <div>
                        {
                            this.state.reviews.length > 0 ?
                                this.state.reviews.map(review =>
                                    <ReviewCard key={review.id} review={review}
                                                user={this.props.authentication.user}/>) :
                                <div className="col-xs-12">
                                    <h3>No reviews for this product. Go ahead
                                        and add one!</h3>
                                    <button className="btn btn-success">Add
                                        review
                                    </button>
                                </div>
                        }
                    </div>
            }


        </div>
    }
}