import {Component} from 'react';
import ReviewCard from './ReviewCard';
import {Link} from 'react-router-dom';
import '../../stylesheets/productReview.scss';

export default class ProductReview extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
        return <div>
            <hr/>
            <div className="row bottom-breather">
                <div className="col-xs-6">
                    <h4>Reviews</h4>
                </div>
                <div className="col-xs-6">
                   <button className="btn btn-success" onClick={() => this.props.history.push(this.props.product.name + "/reviews/add")}>
                        Add review
                    </button>
                </div>
            </div>

            {
                this.props.product.reviews.length > 0 ?
                        <ReviewCard key={this.props.product.reviews[0].id} review={this.props.product.reviews[0]}
                                    user={this.props.user}/> :
                    <p>No reviews for this product, go ahead and add one!</p>
            }

            {
                this.props.product.reviews.length > 1 &&
                <div className="row">
                    <div className="col-xs-12">
                        <Link to={{
                            pathname: '/product/' + this.props.product.id + "/" + this.props.product.name + "/reviews",
                            state: {
                                reviews: this.props.product.reviews
                            }
                        }}
                              className="pull-right bottom-breather">
                            Show all reviews >>
                        </Link>
                    </div>
                </div>
            }
        </div>
    }
}