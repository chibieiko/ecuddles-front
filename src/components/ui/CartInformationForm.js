/**
 * Created by vili on 18/05/2017.
 */
import {Component} from 'react';
import '../../stylesheets/cart.scss';

export default class CartInformationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: {
                name: (this.props.content && this.props.content.name) || "",
                address: (this.props.content && this.props.content.address) || "",
                postalCode: (this.props.content && this.props.content.postalCode) || "",
                city: (this.props.content && this.props.content.city) || "",
                phone: (this.props.content && this.props.content.phone) || ""
            }
        };
    };

    onNext = (e) => {
        e.preventDefault();
        this.props.onNext(this.state.content);
    };

    onPrevious = () => {
        this.props.onPrevious(this.state.content);
    };

    saveState = () => {
        this.props.onSave(this.state.content);
    };

    onChangeName = (e) => {
        let content = this.state.content;
        content.name = e.target.value;

        this.setState({
            content: content
        });
    };

    onChangeAddress = (e) => {
        let content = this.state.content;
        content.address = e.target.value;

        this.setState({
            content: content
        });
    };

    onChangePostalCode = (e) => {
        let content = this.state.content;
        content.postalCode = e.target.value;

        this.setState({
            content: content
        });
    };

    onChangeCity = (e) => {
        let content = this.state.content;
        content.city = e.target.value;

        this.setState({
            content: content
        });
    };

    onChangePhone = (e) => {
        let content = this.state.content;
        content.phone = e.target.value;

        this.setState({
            content: content
        });
    };

    render() {
        return <div>
            <form onSubmit={this.onNext}>
            <div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text"
                               value={this.state.content.name}
                               onChange={this.onChangeName}
                               onBlur={this.saveState}
                               className="form-control"
                               id="name"
                               required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text"
                               value={this.state.content.address}
                               onChange={this.onChangeAddress}
                               onBlur={this.saveState}
                               className="form-control"
                               id="address"
                               required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="postalCode">Postal code</label>
                        <input type="text"
                               value={this.state.content.postalCode}
                               onChange={this.onChangePostalCode}
                               onBlur={this.saveState}
                               className="form-control"
                               id="postalCode"
                               required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text"
                               value={this.state.content.city}
                               onChange={this.onChangeCity}
                               onBlur={this.saveState}
                               className="form-control"
                               id="city"
                               required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone number</label>
                        <input type="text"
                               value={this.state.content.phone}
                               onChange={this.onChangePhone}
                               onBlur={this.saveState}
                               className="form-control"
                               id="phone"
                               required
                        />
                    </div>
            </div>
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
