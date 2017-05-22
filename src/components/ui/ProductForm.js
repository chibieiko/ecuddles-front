import {Component} from 'react';
import PictureBox from './PictureBox';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../../stylesheets/productForm.scss';

export default class ProductForm extends Component {
    constructor(props) {
        super(props);

        let fields = [
            {
                name: "name"
            },
            {
                name: "description"
            },
            {
                name: "price"
            },
            {
                name: "fabric"
            },
            {
                name: "filling"
            },
            {
                name: "designer"
            },
            {
                name: "height"
            },
            {
                name: "width"
            },
            {
                name: "length"
            },
            {
                name: "weight"
            },
            {
                name: "disposeInstructions"
            },
            {
                name: "stock"
            },
            {
                name: "color"
            },
            {
                name: "careInstructions"
            },
            {
                name: "categories",
                defaultValue: []
            },
            {
                name: "pictures",
                defaultValue: []
            }
        ];

        let state = {};

        fields.forEach(field => {
            state[field.name] = this.props.product && this.props.product[field.name] ?
                this.props.product[field.name]
                :
                field.defaultValue ? field.defaultValue : "";
        });

        let categories = this.props.categories.map((category) => {
            return {
                value: category.name,
                label: category.name
            }
        });

        let selectedCategories = [];
        if (this.props.product) {
            selectedCategories = this.props.product.categories.map((category) => {
                    return {
                        value: category,
                        label: category
                    }
                }
            )
        }

        this.state = {
            product: state,
            modalUrl: "",
            modalCaption: "",
            categories: categories,
            selectedCategories: selectedCategories
        };
    }

    onModalFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onModalPictureSubmit = (event) => {
        event.preventDefault();
        $('#pictureModal').modal('hide');

        let picture = {
            url: this.state.modalUrl,
            caption: this.state.modalCaption
        };

        let product = this.state.product;
        product.pictures.push(picture);

        console.log(product);
        this.setState({
            product: product
        });
    };

    onCategoryChange = (newValue) => {
        this.setState({selectedCategories: newValue})
    };

    onChange = (event) => {
        let product = this.state.product;
        product[event.target.name] = event.target.value;

        this.setState({
            product: product
        });
    };

    submitForm = (event) => {
        event.preventDefault();

        let product = this.state.product;
        product.categories = this.state.selectedCategories.map((category) => {
            return category.label
        });

        console.log(product);
        this.props.onSubmit(product);
    };

    removePicture = (index) => {
        let product = this.state.product;
        product.pictures.splice(index, 1);

        this.setState({
            product: product
        });
    };

    render() {
        let product = this.state.product;
        return <div>
            <form onSubmit={this.submitForm}>

                {/* ######### BASIC INFO ######## */}

                <div className="row">
                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name"
                               name="name" placeholder="Teddy"
                               onChange={this.onChange}
                               value={product.name}
                               required/>
                    </div>

                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="price">Price €</label>
                        <input type="number" className="form-control" id="price"
                               name="price" placeholder="8.99" min="1"
                               step="0.01"
                               onChange={this.onChange}
                               value={product.price}
                               required/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description"
                              name="description"
                              placeholder="Describe the product (max 10 000 letters)"
                              rows="7" maxLength="10000"
                              onChange={this.onChange}
                              value={product.description}
                              required/>
                </div>

                <hr/>

                {/* ######### PICTURES ######## */}

                <div className="row">
                    <div className="col-xs-3">
                        <button className="btn btn-default add-picture-button"
                                data-toggle="modal" data-target="#pictureModal">
                            Add picture
                        </button>
                    </div>
                    {
                        product.pictures.length > 0 &&
                        product.pictures.map((picture, index) => {
                            return <div key={index} className="col-xs-3">
                                <PictureBox picture={picture}
                                            onRemove={() => this.removePicture(index)}/>
                            </div>
                        })
                    }
                </div>

                <hr/>

                {/* ######### CATEGORIES ######## */}

                <Select name="categories"
                        multi={true}
                        joinValues={true}
                        clearable={false}
                        onChange={this.onCategoryChange}
                        options={this.state.categories}
                        value={this.state.selectedCategories}
                        placeholder="Select appropriate categories"/>

                <hr/>

                {/* ######### FABRIC & FILLING ######## */}

                <div className="row">
                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="fabric">Fabric</label>
                        <input type="text" className="form-control" id="fabric"
                               name="fabric" placeholder="100% Cotton"
                               max="100"
                               onChange={this.onChange}
                               value={product.fabric}
                               required/>
                    </div>

                    <div className="form-group col-xs-12 col-sm-6">
                        <label htmlFor="filling">Filling</label>
                        <input type="text" className="form-control" id="filling"
                               name="filling" placeholder="Air"
                               max="100"
                               onChange={this.onChange}
                               value={product.filling}
                               required/>
                    </div>
                </div>

                {/* ######### SIZES ######## */}

                <div className="row">
                    <div className="form-group col-xs-12 col-sm-6 col-md-3">
                        <label htmlFor="height">Height (cm)</label>
                        <input type="number" className="form-control"
                               id="height"
                               name="height" placeholder="8.5" min="1"
                               step="0.01"
                               onChange={this.onChange}
                               value={product.height}
                               required/>
                    </div>

                    <div className="form-group col-xs-12 col-sm-6 col-md-3">
                        <label htmlFor="width">Width (cm)</label>
                        <input type="number" className="form-control" id="width"
                               name="width" placeholder="8.3" min="1"
                               step="0.01"
                               onChange={this.onChange}
                               value={product.width}
                               required/>
                    </div>

                    <div className="form-group col-xs-12 col-sm-6 col-md-3">
                        <label htmlFor="length">Length (cm)</label>
                        <input type="number" className="form-control"
                               id="length"
                               name="length" placeholder="8.99" min="1"
                               step="0.01"
                               onChange={this.onChange}
                               value={product.length}
                               required/>
                    </div>

                    <div className="form-group col-xs-12 col-sm-6 col-md-3">
                        <label htmlFor="weight">Weight (kg)</label>
                        <input type="number" className="form-control"
                               id="weight"
                               name="weight" placeholder="0.5" min="1"
                               step="0.01"
                               onChange={this.onChange}
                               value={product.weight}
                               required/>
                    </div>
                </div>

                <hr/>

                {/* ######### INSTRUCTIONS ######## */}

                <div className="form-group">
                    <label htmlFor="careInstructions">Care Instructions</label>
                    <textarea className="form-control" id="careInstructions"
                              name="careInstructions"
                              placeholder="How to take care of the product (max 250 letters)"
                              rows="3" maxLength="250"
                              onChange={this.onChange}
                              value={product.careInstructions}
                              required/>
                </div>

                <div className="form-group">
                    <label htmlFor="disposeInstructions">Dispose
                        Instructions</label>
                    <textarea className="form-control" id="disposeInstructions"
                              name="disposeInstructions"
                              placeholder="How to dispose the product responsibly (max 250 letters)"
                              rows="3" maxLength="250"
                              onChange={this.onChange}
                              value={product.disposeInstructions}
                              required/>
                </div>

                {/* ######### STOCK, COLOR & DESIGNER ######## */}

                <div className="row">
                    <div className="form-group col-xs-12 col-sm-4">
                        <label htmlFor="stock">Stock</label>
                        <input type="number" className="form-control" id="stock"
                               name="stock" placeholder="5" min="1"
                               onChange={this.onChange}
                               value={product.stock}
                               required/>
                    </div>

                    <div className="form-group col-xs-12 col-sm-4">
                        <label htmlFor="color">Color</label>
                        <input type="text" className="form-control" id="color"
                               name="color" placeholder="Brown"
                               onChange={this.onChange}
                               value={product.color}
                               required/>
                    </div>

                    <div className="form-group col-xs-12 col-sm-4">
                        <label htmlFor="designer">Designer</label>
                        <input type="text" className="form-control"
                               id="designer"
                               name="designer" placeholder="Vili Kinnunen"
                               onChange={this.onChange}
                               value={product.designer}
                               required/>
                    </div>
                </div>


                <button type="submit" className="btn btn-success">Submit
                    product
                </button>
            </form>

            {/* ######### PICTURE MODAL ######## */}
            <div className="modal fade" id="pictureModal" tabIndex="-1"
                 role="dialog" aria-labelledby="removeModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="pictureModalLabel">
                                Add picture</h4>
                        </div>

                        <form onSubmit={this.onModalPictureSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="url">Url</label>
                                    <input type="text" className="form-control"
                                           id="url"
                                           name="modalUrl" placeholder="url"
                                           onChange={this.onModalFieldChange}
                                           value={this.state.modalUrl}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="caption">Caption</label>
                                    <input type="text" className="form-control"
                                           id="caption"
                                           name="modalCaption"
                                           placeholder="Front of Teddy"
                                           onChange={this.onModalFieldChange}
                                           value={this.state.modalCaption}
                                           required/>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button"
                                        className="btn btn-default"
                                        data-dismiss="modal">Cancel
                                </button>
                                <button type="submit"
                                        className="btn btn-success">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    }
}

