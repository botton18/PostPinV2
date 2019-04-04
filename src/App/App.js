import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HttpService from '../services/http-service';
import Product from '../components/product/product';

const http = new HttpService();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {products:[]};
    //Bind functions
    this.loadData = this.loadData.bind(this);
    this.loadProduct = this.loadProduct.bind(this);

    this.productList = this.productList.bind(this);

    this.loadData();
    this.loadProduct();

  }

  loadData = () => {
    http.getUsers().then(data => {
      console.log(data);
    }, err => {
      console.log('cannot connect to database')
    });
  }

  loadProduct = () => {
    var self = this;

    http.getProducts().then(data => {
      self.setState({products:data})
      console.log(data);
    }, error => {

    })
  }

  productList = () => {

    console.log('in function')
    const list = this.state.products.map((product) => {
      
      return (<div className="col-sm-4" key={product._id}> 
        <Product title={product.title} price={product.price} imgUrl={product.imgUrl}/>
      </div>)
    });

    return(list);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </header>
        <div className="container App-main">
          <div className="row">
            {this.productList()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
