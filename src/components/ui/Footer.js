import {Component} from 'react';
import '../../stylesheets/footer.scss';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="container footer">
            <hr/>
            <div className="text-center">
            - Everyone needs a hug every now and then -<br/>
            © eCuddles
            </div>
        </div>
    }
}