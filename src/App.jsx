import React, {Component} from 'react';
import faker from 'faker';

class Product  extends Component {

  // UNCOMMENT THE METHOD BELOW TO SEE THE PERFORMANCE IMPROVEMENT
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.product.isFavourite != this.props.product.isFavourite;
  // }

  render() {
    const {product} = this.props;

    // Log to demonstrate how render is run and to make render slower
    // so the visual lag is visible
    console.log("Product::render");

    return (
        <li>
          <img src={product.url}/>
          <h3>{product.title}</h3>
          <input type="checkbox" checked={product.isFavourite}
                 onChange={() => this.props.onProductChanged({...product, isFavourite: !product.isFavourite})}/>
        </li>
    );
  }
}

const ProductsList = (props) => {
  const products = props.products.map((product, index) => {
    return <Product key={index} product={product} onProductChanged={props.onProductChanged} />
  });

  return (
      <ul>
        {products}
      </ul>
  );
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: this.generateRandomList(600)
    }
  }

  generateRandomList(length) {
    const randomList = [];

    for(let i=0; i<length; i++) {
      randomList.push({
        id: faker.random.uuid(),
        title: faker.company.companyName(),
        url: faker.image.imageUrl(),
        isFavourite: false
      });
    }

    return randomList;
  }

  handleProductChanged(changedProduct) {
    let newProducts = this.state.products.map((product) => {
      if(product.id == changedProduct.id) {
        return changedProduct;
      }

      return product;
    });

    this.setState({ products: newProducts });
  }

  render() {
    return (
      <div>
        <ProductsList products={this.state.products} onProductChanged={this.handleProductChanged.bind(this)}/>
      </div>
    );
  }
}

export default App;
