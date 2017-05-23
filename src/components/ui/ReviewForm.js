import {Component} from 'react';
import '../../stylesheets/reviewForm.scss';
import connector from '../../connector';
import Spinner from './Spinner';

export default class ReviewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
            star: 3,
            fetching: false
        };
    }

    onTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    };

    onBodyChange = (event) => {
        this.setState({
            body: event.target.value
        })
    };

    onStarChange = (event) => {
        this.setState({
            star: event.target.value
        })
    };

    onFormSubmit = (event) => {
        event.preventDefault();

        let review = {
            title: this.state.title,
            body: this.state.body,
            stars: this.state.star
        };

        connector("/products/" + this.props.match.params.id + "/reviews", {
            auth: true,
            post: review,
            start: () => this.setState({fetching: true}),
            stop: () => this.setState({fetching: false})
        })
            .then(response => {
                this.props.onReviewAdd();
                this.props.history.goBack();
            })
    };

    render() {
        return <div>
            {
                this.state.fetching &&
                <Spinner delay={500} margin={true}/>
            }
            <h3>Add review for {this.props.match.params.name}</h3>
            <br/>
            <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title"
                           placeholder="Review title"
                           onChange={this.onTitleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Review</label>
                    <textarea className="form-control" id="body"
                              placeholder="Type your review here"
                              onChange={this.onBodyChange} rows="5" required/>
                </div>

                <label>Stars</label>
                <div className="radio">
                    <label>
                        <input type="radio" name="starRadios" id="starRadios1"
                               value="1" onChange={this.onStarChange}/>
                        1
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="starRadios" id="starRadios2"
                               value="2" onChange={this.onStarChange}/>
                        2
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="starRadios" id="starRadios3"
                               value="3" defaultChecked
                               onChange={this.onStarChange}/>
                        3
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="starRadios" id="starRadios4"
                               value="4" onChange={this.onStarChange}/>
                        4
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="starRadios" id="starRadios5"
                               value="5" onChange={this.onStarChange}/>
                        5
                    </label>
                </div>

                <br/>

                <button type="submit" className="btn btn-success">
                    Submit review
                </button>

                <button className="btn btn-default left-breather"
                onClick={this.props.history.goBack}>
                    Cancel
                </button>

            </form>
        </div>
    }
}