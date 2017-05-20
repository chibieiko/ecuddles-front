/**
 * Created by vili on 20/05/2017.
 */
import {Component} from 'react';
import {Link} from 'react-router-dom';
import Spinner from './Spinner';
import connector from '../../connector';
import dateFormat from 'dateformat';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            log: null
        };
    };

    componentDidMount() {
        this.loadLogs();
    }

    loadLogs = () => {
        this.setState({
            fetching: true
        });

        connector("/purchaseLogEntries", {auth: true})
            .then(response => {
                this.setState({
                    fetching: false,
                    log: response["_embedded"].purchaseLogEntries.reverse()
                });
            })
            .catch(() => {
                this.setState({
                    fetching: false
                });
            });
    };

    render() {
        return <div className="row">
            <div className="col-xs-12 table-responsive">
                {
                    this.state.fetching &&
                    <Spinner margin={true}/>
                }
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>
                            Date
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Product
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Address
                        </th>
                        <th>
                            Phone
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.log &&
                                this.state.log.map((entry, index) => {
                                    let date = new Date(entry.bought);
                                    return <tr key={index}>
                                        <td>
                                            {dateFormat(date, "d.m.yyyy HH:MM")}
                                        </td>
                                        <td>
                                            {entry.quantity}
                                        </td>
                                        <td>
                                            <Link to={"/product/" + entry.productId}>{entry.productName}</Link>
                                        </td>
                                        <td>
                                            {entry.userEmail}
                                        </td>
                                        <td>
                                            {entry.address}, {entry.postalCode} {entry.city}
                                        </td>
                                        <td>
                                            {entry.phone}
                                        </td>
                                    </tr>;
                                })
                        }
                    </tbody>
                </table>
            </div>
        </div>;
    };
};