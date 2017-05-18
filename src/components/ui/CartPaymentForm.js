/**
 * Created by vili on 18/05/2017.
 */
import {Component} from 'react';
import '../../stylesheets/cart.scss';

export default class CartPaymentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: {
                cardNumber: (this.props.content && this.props.content.cardNumber) || "",
                cardHolder: (this.props.content && this.props.content.cardHolder) || "",
                expiration: (this.props.content && this.props.content.expiration) || "",
                cvs: (this.props.content && this.props.content.cvs) || ""
            }
        };
    };

    onCheckout = (e) => {
        e.preventDefault();
        this.props.onCheckout();
    };

    onPrevious = () => {
        this.props.onPrevious(this.state.content);
    };

    saveState = () => {
        this.props.onSave(this.state.content);
    };

    onChangeCardNumber = (e) => {
        let content = this.state.content;
        content.cardNumber = e.target.value;

        this.setState({
            content: content
        });
    };

    onChangeCardHolder = (e) => {
        let content = this.state.content;
        content.cardHolder = e.target.value;

        this.setState({
            content: content
        });
    };

    onChangeExpiration = (e) => {
        let content = this.state.content;
        content.expiration = e.target.value;

        this.setState({
            content: content
        });
    };

    onChangeCvs = (e) => {
        let content = this.state.content;
        content.cvs = e.target.value;

        this.setState({
            content: content
        });
    };

    render() {
        return <div>
            <form onSubmit={this.onCheckout}>
                <div>

                    <div className="form-group">
                        <label htmlFor="cardNumber">Card number</label>
                        <input type="text"
                               placeholder="1234 5678 9101 1121"
                               value={this.state.content.cardNumber}
                               onChange={this.onChangeCardNumber}
                               onBlur={this.saveState}
                               className="form-control"
                               id="cardNumber"
                               required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="expiration">Expiration</label>
                        <input type="text"
                               placeholder="Month/Year"
                               value={this.state.content.expiration}
                               onChange={this.onChangeExpiration}
                               onBlur={this.saveState}
                               className="form-control"
                               id="expiration"
                               required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardHolder">Card holder</label>
                        <input type="text"
                               placeholder="John Snow"
                               value={this.state.content.cardHolder}
                               onChange={this.onChangeCardHolder}
                               onBlur={this.saveState}
                               className="form-control"
                               id="cardHolder"
                               required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cvs">CVS</label>
                        <input type="text"
                               placeholder="123"
                               value={this.state.content.cvs}
                               onChange={this.onChangeCvs}
                               onBlur={this.saveState}
                               className="form-control"
                               id="cvs"
                               required/>
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
