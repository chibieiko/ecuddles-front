import {Component} from 'react';
import ProductForm from '../containers/ProductForm';
import Spinner from './Spinner';
import connector from '../../connector';

export default class ModifyProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: null
        };
    }

    componentDidMount() {
        connector('/products/' + this.props.match.params.id + "?projection=inspect")
            .then((result) => {
                console.log(result);
                this.setState({
                    product: result
                })
            });
    }

    submitForm = (product) => {
        console.log("product", product);

        connector('/products/' + this.props.match.params.id,
            {
                patch: product,
                auth: true,
                successNotification: "Successfully modified product!"
            })
            .then(() => {
                this.props.history.push('/');
            });
    };

    render() {
        return <div>
            <h3>Modify {this.props.match.params.name}</h3>
            {
                this.state.product ?
                    <ProductForm onSubmit={this.submitForm}
                                 product={this.state.product}/>
                    :
                    <Spinner margin={true}/>

            }
        </div>
    }
}