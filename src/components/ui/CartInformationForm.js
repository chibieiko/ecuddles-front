/**
 * Created by vili on 18/05/2017.
 */
import {Component} from 'react';
import '../../stylesheets/cart.scss';

export default class CartInformationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completed: false,
            content: this.props.content
        };
    };

    onSave = () => {

    };

    onNext = () => {
        if (this.state.completed) {
            this.props.onNext(this.state.content);
        }
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

    render() {
        return <div>
            <div>
                <input type="text" value={this.state.content.name} onChange={this.onChangeName} onBlur={this.saveState}/>
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
                    <button className={
                        this.state.completed ?
                            "btn btn-success pull-right disabled"
                            :
                            "btn btn-success pull-right"
                        } onClick={this.onNext}>
                        Continue
                    </button>
                </div>
            </div>
        </div>;
    };
};
