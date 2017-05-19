import {Component} from 'react';
import Stars from './Stars';
import '../../stylesheets/reviewCard.scss';
import dateFormat from 'dateformat';

export default class ReviewCard extends Component {
    constructor(props) {
        super(props);

        let date = new Date(this.props.review.date);
        date = dateFormat(date, "dd mmm yyyy");
        this.state = {
            date: date
        };
    }

    render() {
        return <div className="panel panel-default">
            <div className="panel-body">

                <div className="row">
                    <div className="col-xs-12 col-sm-9 col-md-10">
                        <strong>{this.props.review.title}</strong>
                    </div>
                    <div className="col-xs-12 col-sm-3 col-md-2 review-date">
                        {this.state.date}
                    </div>
                </div>

                <div className="row review-stars">
                    <div className="col-xs-12">
                        <Stars rating={this.props.review.stars}/>
                    </div>
                </div>

                <div className="row review-item">
                    <div className="col-xs-12">
                        {this.props.review.body}
                    </div>
                </div>

                <div className="row review-item">
                    <div className="col-xs-12">
                        <span
                            className="glyphicon glyphicon-user right-breather"/> {this.props.review.user.name}
                    </div>
                </div>

                <div className="row review-item">
                    {
                        this.props.user && this.props.user.id == this.props.review.user.id &&
                        <div className="col-xs-12">
                            <button
                                className="btn btn-sm btn-danger"
                            onClick={this.props.deleteReview}>
                                <span className="glyphicon glyphicon-trash"/> Delete review
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    }
}