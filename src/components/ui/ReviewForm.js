import {Component} from 'react';

export default class ReviewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
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

    onFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.title);
        console.log(this.state.body);
    };

    render() {
        return <div>
            <h3>Add review for {this.props.match.params.name}</h3>
            <br/>
            <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title"
                           placeholder="Review title"
                           onChange={this.onTitleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Review</label>
                    <textarea className="form-control" id="body"
                              placeholder="Type your review here"
                              onChange={this.onBodyChange} rows="5"/>
                </div>

                <button type="submit" className="btn btn-success">Submit
                    review
                </button>
            </form>
        </div>
    }
}