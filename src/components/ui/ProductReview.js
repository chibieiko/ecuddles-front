import {Component} from 'react';
import ReviewCard from './ReviewCard';

export default class ProductReview extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.product);
    }

    render() {
        return <div>
            <hr/>
            <div className="row">
                <div className="col-xs-6">
                    <h4>Reviews</h4>
                </div>
                <div className="col-xs-6">
                    <button className="btn btn-success pull-right">
                        Add review
                    </button>
                </div>
            </div>


            {
                this.props.product.reviews.length > 0 ? this.props.product.reviews.map(review =>
                    <ReviewCard key={review.id} review={review}/>) :
                <p>No reviews for this product, go ahead and add one!</p>
            }

        </div>
    }
}