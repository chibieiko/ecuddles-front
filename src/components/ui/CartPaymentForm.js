/**
 * Created by vili on 18/05/2017.
 */
import {Component} from 'react';
import '../../stylesheets/cart.scss';

export default class CartPaymentForm extends Component {
    constructor(props) {
        super(props);

        let fields = [
            {
                name: "cardNumber",
                label: "Card number",
                placeholder: "1234 5678 9101 1121"
            },
            {
                name: "cardHolder",
                label: "Card holder",
                placeholder: "John Snow"
            },
            {
                name: "expiration",
                label: "Expiration",
                placeholder: "10/19"
            },
            {
                name: "cvv",
                label: "CVV",
                placeholder: "123"
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
