import {Component} from 'react';

export default class ProductLister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productName: ""
        }
    };

    onChange = (e) => {
        this.setState({productName: e.target.value});
        this.props.onChange(e.target.value);
    };

    render() {
        return <div>
            <form>
                <input value={this.state.productName} type="text"
                       onChange={this.onChange}/>
                {this.props.fetching ? <i>Fetching...</i> : <i>Not fetching</i>}
            </form>
            <div>
                <ul>
                    {this.props.suggestions.map(suggestion => {
                        return <li>{suggestion.name}</li>
                    })}
                </ul>
            </div>
        </div>;
    };
};