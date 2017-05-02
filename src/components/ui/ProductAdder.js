import {Component} from 'react';

export default class ProductAdder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productName: "",
            productId: Math.floor(Math.random() * 100000)
        }
    };

    onChange = (e) => {
        this.setState({productName: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();

        this.props.onNewProduct({
            id: this.state.productId,
            name: this.state.productName
        });
    };

    render() {
        return <form onSubmit={this.onSubmit}>
            <input value={this.state.productName} type="text" onChange={this.onChange}/>
            <br/>
            <input type="submit"/>
        </form>;
    };
};