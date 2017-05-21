import {Component} from 'react';

export default class ProductForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <form onSubmit={this.props.submitForm}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name"
                       name="name" placeholder="Teddy"
                       onChange={this.props.checkInput}/>
            </div>

            <button type="submit" className="btn btn-default">Submit</button>
        </form>
    }
}

