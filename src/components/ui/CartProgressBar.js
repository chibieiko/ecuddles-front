/**
 * Created by vili on 15/05/2017.
 */
import {Component} from 'react';
import '../../stylesheets/cart.scss';

const Step = (props) => (
    <div className="stepper-step">
        <div className={props.current ? "stepper-number current" : "stepper-number"}>
            {props.number}
        </div>
        <div className="stepper-title">
            {props.title}
        </div>
    </div>
);

export default class CartProgressBar extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div className="stepper-bar">
            <Step current={true} number={1} title="Shopping cart"/>
            <Step number={2} title="Information"/>
            <Step number={3} title="Payment"/>
        </div>;
    };
};
