import {Component} from 'react';
import '../../stylesheets/pagination.scss';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="col-xs-12" id="pagination">

                <div className="col-xs-4">
                    <button className="btn btn-default"
                            onClick={this.props.previousPage}
                            disabled={this.props.page.number <= 0}>
                                    <span
                                        className="hidden-xs">Previous page</span>
                        <span
                            className="glyphicon glyphicon-arrow-left hidden-lg hidden-md hidden-sm col-xs-1"/>
                    </button>
                </div>

                <div className="col-xs-4 text-center">
                <span className="dropup">
                    <button className="btn btn-default dropdown-toggle"
                            type="button" id="pageMenu"
                            data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                        {this.props.page.number + 1} <span
                        className="caret"/>
                    </button>

                    <ul className="dropdown-menu"
                        aria-labelledby="pageMenu">
                        {
                            this.props.page.pages && this.props.page.pages.map(pageNum =>
                                <li key={pageNum}><a
                                    onClick={() => this.props.jumpToPage(pageNum)}>{pageNum}</a>
                                </li>)
                        }
                    </ul>
                </span> / {this.props.page.totalPages}
                </div>

                <div className="col-xs-4">
                    <button className="btn btn-default pull-right"
                            onClick={this.props.nextPage}
                            disabled={this.props.page.number >= this.props.page.totalPages - 1}>
                        <span className="hidden-xs">Next page</span>
                        <span
                            className="glyphicon glyphicon-arrow-right hidden-lg hidden-md hidden-sm col-xs-1"/>
                    </button>
                </div>
            </div>
    }
}
