import {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../stylesheets/productListSort.scss';

export default class ProductListSort extends Component {
    constructor(props) {
        super(props);
    };

    checkName = () => {
        switch (this.props.location.search) {
            case "?sort=date,desc":
                return "Newest first";

            case "?sort=price,desc":
                return "Most expensive first";

            case "?sort=price,asc":
                return "Cheapest first";

            default:
                return "Newest first";
        }
    };

    render() {
        return <div className="col-xs-12" id="sort-button">
            <div className="row">

                <div className="col-xs-6">
                    {
                        this.props.authentication.user && this.props.authentication.user.role === "ADMIN" &&
                        <div className="btn btn-success"
                             onClick={() => this.props.history.push('/add-product')}>
                            <span className="glyphicon glyphicon-plus"/>&nbsp;Add&nbsp;a&nbsp;product
                        </div>
                    }
                </div>

                <div className="col-xs-6">
                    <div className="btn-group pull-right">
                        <button className="btn btn-default dropdown-toggle"
                                type="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            {this.checkName()} <span className="caret"/>
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to={'?sort=date,desc'}>Newest
                                first</Link>
                            </li>
                            <li><Link to={'?sort=price,asc'}>Cheapest
                                first</Link>
                            </li>
                            <li><Link to={'?sort=price,desc'}>Most expensive
                                first</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>;
    };
};