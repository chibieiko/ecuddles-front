import {Component} from 'react';

export default class ProductForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;

        return <form onSubmit={this.props.submitForm}>
            <div className="row">
                <div className="form-group col-xs-12 col-sm-6">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name"
                           name="name" placeholder="Teddy"
                           onChange={this.props.checkInput}
                           value={product && product.name}
                           required/>
                </div>

                <div className="form-group col-xs-12 col-sm-6">
                    <label htmlFor="price">Price €</label>
                    <input type="number" className="form-control" id="price"
                           name="price" placeholder="8.99" min="1"
                           step="0.01"
                           onChange={this.props.checkInput}
                           value={product && product.price}
                           required/>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description"
                          name="description"
                          placeholder="Describe the product (max 10 000 words)"
                          rows="7" maxLength="10 000"
                          onChange={this.props.checkInput}
                          value={product && product.description}
                          required/>
            </div>

            <hr/>

            <div className="row">
                <div className="form-group col-xs-12 col-sm-6">
                    <label htmlFor="fabric">Fabric</label>
                    <input type="text" className="form-control" id="fabric"
                           name="fabric" placeholder="100% Cotton"
                           max="100"
                           onChange={this.props.checkInput}
                           value={product && product.fabric}
                           required/>
                </div>

                <div className="form-group col-xs-12 col-sm-6">
                    <label htmlFor="filling">Filling</label>
                    <input type="text" className="form-control" id="filling"
                           name="filling" placeholder="Air"
                           max="100"
                           onChange={this.props.checkInput}
                           value={product && product.filling}
                           required/>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-xs-12 col-sm-6 col-md-3">
                    <label htmlFor="height">Height (cm)</label>
                    <input type="number" className="form-control" id="height"
                           name="height" placeholder="8.5" min="1"
                           step="0.01"
                           onChange={this.props.checkInput}
                           value={product && product.height}
                           required/>
                </div>

                <div className="form-group col-xs-12 col-sm-6 col-md-3">
                    <label htmlFor="width">Width (cm)</label>
                    <input type="number" className="form-control" id="width"
                           name="width" placeholder="8.3" min="1"
                           step="0.01"
                           onChange={this.props.checkInput}
                           value={product && product.width}
                           required/>
                </div>

                <div className="form-group col-xs-12 col-sm-6 col-md-3">
                    <label htmlFor="length">Length (cm)</label>
                    <input type="number" className="form-control" id="length"
                           name="length" placeholder="8.99" min="1"
                           step="0.01"
                           onChange={this.props.checkInput}
                           value={product && product.length}
                           required/>
                </div>

                <div className="form-group col-xs-12 col-sm-6 col-md-3">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input type="number" className="form-control" id="weight"
                           name="weight" placeholder="0.5" min="1"
                           step="0.01"
                           onChange={this.props.checkInput}
                           value={product && product.weight}
                           required/>
                </div>
            </div>

            <hr/>

            <div className="form-group">
                <label htmlFor="careInstructions">Care Instructions</label>
                <textarea className="form-control" id="careInstructions"
                          name="careInstructions"
                          placeholder="How to take care of the product (max 250 words)"
                          rows="3" maxLength="250"
                          onChange={this.props.checkInput}
                          value={product && product.careInstructions}
                          required/>
            </div>

            <div className="form-group">
                <label htmlFor="disposeInstructions">Dispose
                    Instructions</label>
                <textarea className="form-control" id="disposeInstructions"
                          name="disposeInstructions"
                          placeholder="How to dispose the product responsibly (max 250 words)"
                          rows="3" maxLength="250"
                          onChange={this.props.checkInput}
                          value={product && product.disposeInstructions}
                          required/>
            </div>

            <div className="row">
                <div className="form-group col-xs-12 col-sm-4">
                    <label htmlFor="stock">Stock</label>
                    <input type="number" className="form-control" id="stock"
                           name="stock" placeholder="5" min="1"
                           onChange={this.props.checkInput}
                           value={product && product.stock}
                           required/>
                </div>

                <div className="form-group col-xs-12 col-sm-4">
                    <label htmlFor="color">Color</label>
                    <input type="text" className="form-control" id="color"
                           name="color" placeholder="Brown"
                           onChange={this.props.checkInput}
                           value={product && product.color}
                           required/>
                </div>

                <div className="form-group col-xs-12 col-sm-4">
                    <label htmlFor="designer">Designer</label>
                    <input type="text" className="form-control" id="designer"
                           name="designer" placeholder="Brown"
                           onChange={this.props.checkInput}
                           value={product && product.designer}
                           required/>
                </div>
            </div>

            <button type="submit" className="btn btn-success">Submit product</button>
        </form>
    }
}

