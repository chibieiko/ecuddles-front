import {Component} from 'react';
import '../../stylesheets/cart.scss';

export default class CartInformationForm extends Component {
    constructor(props) {
        super(props);

        let fields = [
            {
                name: "name",
                label: "Name",
                placeholder: "Recipient's name"
            },
            {
                name: "address",
                label: "Address",
                placeholder: "Recipient's address"
            },
            {
                name: "postalCode",
                label: "Postal code",
                placeholder: "Recipient's postal code"
            },
            {
                name: "city",
                label: "City",
                placeholder: "Recipient's city"
            },
            {
                name: "phone",
                label: "Phone number",
                placeholder: "Recipient's phone number for delivery purposes"
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

    onNext = (e) => {
        e.preventDefault();
        this.props.onNext(this.getContent());
    };

    onPrevious = () => {
        this.props.onPrevious(this.getContent());
    };

    saveState = () => {
        this.props.onSave(this.getContent());
    };

    render() {
        return <div>
            <form onSubmit={this.onNext}>
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
                    <button type="submit"
                            className="btn btn-success pull-right">
                        Continue
                    </button>
                </div>
            </div>
            </form>
        </div>;
    };
};
