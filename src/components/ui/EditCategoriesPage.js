import {Component} from 'react';
import {Link} from 'react-router-dom';
import Spinner from './Spinner';
import connector from '../../connector';

export default class EditCategoriesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            categories: null,
            toRemove: null,
            toModify: null,
            modifyName: "",
            addName: ""
        };
    };

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories = () => {
        this.setState({
            fetching: true
        });

        connector("/categories")
            .then(response => {
                this.setState({
                    fetching: false,
                    categories: response["_embedded"].categories
                });
            })
            .catch(() => {
                this.setState({
                    fetching: false
                });
            });
    };

    removeCategory = () => {
        this.setState({
            fetching: true
        });

        connector("/categories/" + this.state.toRemove, {
            delete: true,
            auth: true,
            successNotification: "Category removed successfully"
        }).then(response => {
            this.setState({
                categories: this.state.categories.filter(category => (category.id !== this.state.toRemove)),
                toRemove: null,
                fetching: false
            });
        }).catch(error => {
            this.setState({
                toRemove: null,
                fetching: false
            });
        });
    };

    modifyCategory = () => {
        if (this.state.modifyName.length > 0) {
            this.setState({
                fetching: true
            });

            connector("/categories/" + this.state.toModify, {
                patch: {name: this.state.modifyName},
                auth: true,
                successNotification: "Category edited successfully"
            }).then(response => {
                this.setState({
                    categories: this.state.categories.map(category => {
                        if (category.id === this.state.toModify) {
                            category.name = this.state.modifyName;
                        }

                        return category;
                    }),
                    toModify: null,
                    fetching: false
                });
            }).catch(error => {
                this.setState({
                    toModify: null,
                    fetching: false
                });
            });
        }
    };

    addCategory = (e) => {
        e.preventDefault();

        if (this.state.addName.length > 0) {
            this.setState({
                fetching: true
            });

            connector("/categories/", {
                post: {name: this.state.addName},
                auth: true,
                successNotification: "Category created successfully"
            }).then(response => {
                this.setState({
                    addName: "",
                    fetching: false
                });

                this.loadCategories();
            }).catch(error => {
                this.setState({
                    fetching: false
                });
            });
        }
    };

    onModifyNameChange = (e) => {
        this.setState({
            modifyName: e.target.value
        });
    };

    onAddNameChange = (e) => {
        this.setState({
            addName: e.target.value
        });
    };

    render() {
        return <div className="row">
            <div className="col-xs-12">
                <h2>Manage categories</h2>
                <div className="table-responsive">
                    {
                        this.state.fetching &&
                        <Spinner margin={true}/>
                    }
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>
                                Category
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.categories &&
                            this.state.categories.map(category => {
                                return <tr key={category.id}>
                                    <td>
                                        {category.name}
                                    </td>
                                    <td>
                                        <button className="btn btn-xs btn-success"
                                                data-toggle="modal"
                                                data-target="#modifyModal"
                                                onClick={() => this.setState({toModify: category.id, modifyName: category.name})}>
                                            Modify
                                        </button> <button className="btn btn-xs btn-danger"
                                                          data-toggle="modal"
                                                          data-target="#removeModal"
                                                          onClick={() => this.setState({toRemove: category.id})}>
                                        Delete
                                    </button>
                                    </td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <h2>Add a category</h2>
                <form onSubmit={this.addCategory}>
                <div className="form-group">
                    <input className="form-control"
                           placeholder="Name for the category"
                           type="text"
                           value={this.state.addName}
                           onChange={this.onAddNameChange}/>
                </div>
                <button className="btn btn-success" type="submit">Submit</button>
                </form>
            </div>
            <div className="modal fade" id="removeModal" tabIndex="-1" role="dialog" aria-labelledby="removeModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="removeModalLabel">Delete category</h4>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to permanently delete this category and all the products it contains?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={this.removeCategory}
                                    data-dismiss="modal">Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modifyModal" tabIndex="-1" role="dialog" aria-labelledby="modifyModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="modifyModalLabel">Rename category</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <input className="form-control" type="text" value={this.state.modifyName} onChange={this.onModifyNameChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={this.modifyCategory}
                                    data-dismiss="modal">Modify
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    };
};