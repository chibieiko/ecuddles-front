import {Component} from 'react';
import '../../stylesheets/cart.scss';

export default class CartPaymentForm extends Component {
    constructor(props) {
        super(props);

        let fields = [
            {
                name: "cardNumber",
                label: "Card number",
                placeholder: "Credit card number"
            },
            {
                name: "cardHolder",
                label: "Card holder",
                placeholder: "The card holder's name"
            },
            {
                name: "expiration",
                label: "Expiration",
                placeholder: "Card expiration date"
            },
            {
                name: "cvv",
                label: "CVV",
                placeholder: "Three numbers on the back of the card"
            }
        ];

        fields.map(field => {
            field.value = (this.props.content && this.props.content[field.name]) || "";
        });

        this.state = {
            fields: fields
        };
    };

    onValueChange = (e) => {
        let fields = this.state.fields.map(field => {
            if (field.name === e.target.name) {
                field.value = e.target.value;
            }

            return field;
        });

        this.setState({
            fields: fields
        });
    };

    getContent = () => {
        let content = {};

        this.state.fields.forEach(field => {
            content[field.name] = field.value;
        });

        return content;
    };

    onCheckout = (e) => {
        e.preventDefault();
        this.props.onCheckout();
    };

    onPrevious = () => {
        this.props.onPrevious(this.getContent());
    };

    saveState = () => {
        this.props.onSave(this.getContent());
    };

    render() {
        return <div>
            <form onSubmit={this.onCheckout}>
                {
                    this.state.fields.map(field => {
                        return <div key={field.name} className="form-group">
                            <label htmlFor={field.name}>{field.label}</label>
                            <input type="text"
                                   name={field.name}
                                   value={field.value}
                                   onChange={this.onValueChange}
                                   onBlur={this.saveState}
                                   className="form-control"
                                   placeholder={field.placeholder ? field.placeholder : ""}
                                   id={field.name}
                                   required
                            />
                        </div>
                    })
                }
                <hr/>
                <div className="row">
                    <div className="col-xs-6">
                        <button className="btn btn-success pull-left"
                                onClick={this.onPrevious}>
                            Previous
                        </button>
                    </div>
                    <div className="col-xs-6">
                        <button className="btn btn-success pull-right"
                                type="submit">
                            Checkout
                        </button>
                    </div>
                </div>
            </form>
        </div>;
    };
};
