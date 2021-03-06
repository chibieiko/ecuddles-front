import {Component} from 'react';
import '../../stylesheets/cart.scss';
import CartProgressBar from './CartProgressBar';
import CartItemList from './CartItemList';
import CartInformationForm from './CartInformationForm';
import CartPaymentForm from './CartPaymentForm';
import Spinner from './Spinner';

export default class CartPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false
        }
    };

    saveState = (state) => {
        let current = isNaN(this.props.current) ? 0 : this.props.current;
        this.props.savePhase(current, state);
    };

    nextPhase = (saveState) => {
        let current = isNaN(this.props.current) ? 0 : this.props.current;
        this.props.savePhase(current, saveState);
        this.props.saveProgress(current + 1);
    };

    previousPhase = (saveState) => {
        let current = isNaN(this.props.current) ? 0 : this.props.current;
        this.props.savePhase(current, saveState);
        this.props.saveProgress(current - 1);
    };

    checkout = () => {
        this.props.checkout(() => this.setState({fetching: true}), () => this.setState({fetching: false}));
    };

    render() {
        let current = isNaN(this.props.current) ? 0 : this.props.current;

        let phases = [
            <CartItemList content={this.props.phases ? this.props.phases[0] : {}}
                          entries={this.props.cart} onNext={this.nextPhase}
                          onSave={this.saveState}/>,
            <CartInformationForm content={this.props.phases ? this.props.phases[1] : {}} onPrevious={this.previousPhase} onNext={this.nextPhase} onSave={this.saveState}/>,
            <CartPaymentForm content={this.props.phases ? this.props.phases[2] : {}} onPrevious={this.previousPhase} onSave={this.saveState} onCheckout={this.checkout}/>
        ];

        return <div>
            <CartProgressBar steps={["Cart", "Information", "Payment"]} current={current}/>
            {
                this.state.fetching &&
                <div>
                    <hr/>
                    <Spinner delay={0} margin={true}/>
                </div>
            }
            <hr/>
            {phases[current]}
        </div>;
    };
};
