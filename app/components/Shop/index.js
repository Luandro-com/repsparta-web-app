/**
*
* Shop
*
*/

import React from 'react';
import Loader from 'halogen/PulseLoader';

import ProductItem from 'components/ProductItem';
import CheckoutDialog from 'components/CheckoutDialog';

import styles from './styles.css';
import Divider from './divider1.png';
import Event from './NICO.png';
import Action from './garanta-ja.png';
import Total from './total.png';

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cc_focus: 'name',
      cc_number: '',
      cc_cvc: '',
      cc_name: '',
      cc_date: '',
      payment: 'cc',
      total: 0,
      open: false,
      finished: false,
      stepIndex: 0,
    }
  }

  componentDidUpdate(nextProps, nextState) {
    const { products } = this.props;
    if(nextProps.products.length === products.length) {
      return;
    } else {
      products.map((item) => {
        this.setState({
          [`selected${item.id}`]: 1,
          [`counter${item.id}`]: 0
        })
      });
    }
  }

  changeTotal(id) {
    return this.props.products
    .filter((item) => {
      return item.id === id
    })
    .map((res) => {
      return res.price
    })
  }

  handleCounterInc = (id) => {
    const price = Number(this.changeTotal(id));
    this.setState({
      [`counter${id}`]: this.state[`counter${id}`] + 1,
      total: this.state.total + price
    });
  }

  handleCounterDec = (id) => {
    const price = this.changeTotal(id);
    if(this.state[`counter${id}`] > 0) {
      this.setState({
        [`counter${id}`]: this.state[`counter${id}`] - 1,
        total: this.state.total - price
      });
    }
  }

  handleSelectChange = (id, e, index, value) => {
    this.setState({
      [`selected${id}`]: value
    })
  }

  handleClick = () => {
    const data = {
      order: {
       payment_details: {
         method_id: 'bacs',
         method_title: 'Direct Bank Transfer',
         paid: true
       },
       billing_address: {
         first_name: 'John',
         last_name: 'Doe',
         address_1: '969 Market',
         address_2: '',
         city: 'San Francisco',
         state: 'CA',
         postcode: '94103',
         country: 'US',
         email: 'john.doe@example.com',
         phone: '(555) 555-5555'
       },
       line_items: [
         {
           product_id: 14,
           quantity: 2,
           variations: {
             república: 'Sparta'
           }
         },
         {
           product_id: 8,
           quantity: 1,
           variations: {
             república: 'Sparta'
           }
         }
       ]
     }
    }
    // postOrder(data);
   this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleCCFocus = (e) => {
    this.setState({
      cc_focus: e.target.name
    })
  }
  handleCCName = (e) => {
    this.setState({
      cc_name: e.target.value
    })
  }
  handleCCNumber = (e) => {
    this.setState({
      cc_number: e.target.value
    })
  }
  handleCCcvc = (e) => {
    this.setState({
      cc_cvc: e.target.value
    })
  }
  handleCCDate = (e) => {
    this.setState({
      cc_date: e.target.value
    })
  }

  render() {
    const { products, postOrder } = this.props;
    let ProductList;
    products.length > 0
      ? ProductList = (
        <div className={ styles.products }>
          {products.map((item, key) => {
            const counter = this.state[`counter${item.id}`]
            const selected = this.state[`selected${item.id}`];
            return <ProductItem
              key={key} {...item}
              inc={this.handleCounterInc.bind(null, item.id)}
              dec={this.handleCounterDec.bind(null, item.id)}
              change={this.handleSelectChange.bind(null, item.id)}
              counter={counter}
              selected={selected} />
          })}
        </div>
      )
      : ProductList = <Loader />
    return (
      <div className={ styles.wrapper }>
        <img className={ styles.divider } src={Divider} />
        <img className={ styles.event } src={Event} />
        { ProductList }
        <div className={ styles.action }>
          <img className={ styles.banner} src={Action} />
          <hr className={ styles.line } />
          <img className={ styles.total } src={Total} />
          <h2 className={ styles.value }>R${this.state.total},00</h2>
          <button className={ styles.button } onClick={this.handleClick}>Finalizar Compra</button>
        </div>
        <CheckoutDialog
          props={this.state}
          postOrder={postOrder}
          products={products}
          style={{width: '100%'}}
          close={this.handleClose}
          handleNext={this.handleNext}
          handlePrev={this.handlePrev}
          handleCCName={this.handleCCName}
          handleCCNumber={this.handleCCNumber}
          handleCCcvc={this.handleCCcvc}
          handleCCDate={this.handleCCDate}
          handleCCFocus={this.handleCCFocus}/>
      </div>
    );
  }
}

export default Shop;
