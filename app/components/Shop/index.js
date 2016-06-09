/**
*
* Shop
*
*/

import React from 'react';
import 'whatwg-fetch';

import Loader from 'halogen/SquareLoader';
import ProductItem from 'components/ProductItem';
import CheckoutDialog from 'components/CheckoutDialog';
import FlatButton from 'material-ui/FlatButton';

import styles from './styles.css';
import Divider from './divider1.svg';
import Action from './garanta-ja.png';
import Total from './total.png';

const sty = {
  finalize: {
    margin: '5% 0 10%',
    border: '1px solid #fff',
    padding: '20px 40px',
    height: 'auto',
    lineHeight: 'auto',
    color: '#fff'

  }
}

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      email: '',
      total: 0,
      open: false,
      full_name_error: false,
      email_error: false,
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
    if(this.state[`selected${id}`] > 1 || this.state[`selected${id}`].length > 1) {
      const product = this.props.products
      .filter((item) => {
        return item.id === id
      });
      const variation = product[0].variations.filter((item) => {
        return item.attributes[0].option === this.state[`selected${id}`]
      })
      const price = Number(this.changeTotal(id));
      if(this.state[`counter${id}`] < variation[0].stock_quantity) {
        this.setState({
          [`counter${id}`]: this.state[`counter${id}`] + 1,
          total: this.state.total + price
        });
      }
    }
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
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  /**
   * Form controllers
   */
  handleSubmit = () => {
    const {
      total, full_name, email,
      full_name_error, email_error, cep_error
    } = this.state;
    let cart = [];
    const { products, startPayment } = this.props;
    products.map((item, key) => {
      const { id, title, price, variations} = item;
      if(this.state[`counter${id}`]) {
        const variation = variations
        .filter((variation) => {
          return variation.attributes[0].option === this.state[`selected${id}`];
        });
        let variation_id, meta;
        variation[0]
          ? variation_id = variation[0].id
          : variation_id = undefined

        variation[0]
          ? meta = {
                key: variation[0].attributes[0].name,
                value: variation[0].attributes[0].option
              }
          : meta = [];

        cart.push({
          name: title,
          price,
          total: this.state.total.toString(),
          product_id: id,
          variation_id,
          quantity: this.state[`counter${id}`],
          meta,
        })
      }
    });
    function checkErrors() {
      if(!full_name_error && !email_error && !(full_name.split(' ').length < 2) && !(email.split('').length < 5)) {
        return false
      }
      return true
    }
    if(!checkErrors()) {
      startPayment({
          total,
          full_name,
          email,
          cart
        });
    }
  }

  handleName = (e) => {
    const text = e.target.value
    if(text.length < 2) {
      this.setState({
        full_name_error: true,
        full_name: text
      })
    } else {
      this.setState({
        full_name_error: false,
        full_name: text
      })
    }
  }
  handleEmail = (e) => {
    const text = e.target.value

    function checkemail(input){
      var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      if (filter.test(input))
        return true
      else {
        return false
      }
    }
    const checked = checkemail(text);
    if(text.length < 2 || !checked) {
      this.setState({
        email_error: true,
        email: text
      })
    } else {
      this.setState({
        email_error: false,
        email: text
      })
    }
  }
  handleFormName = (id, e) => {
    this.setState({
      [`formName${id}`]: e.target.value
    });
  }
  handleFormDoc = (id, e) => {
    this.setState({
      [`formDoc${id}`]: e.target.value
    });
  }


  render() {
    const { total } = this.state;
    const { products, order, startPayment, eventImg } = this.props;
    let ProductList, eventImgHolder, finish;
    eventImg
      ? eventImgHolder = <img height={255} width={255} src={eventImg} />
      : eventImgHolder = <Loader color={'#000'} />
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
    total > 0
      ? finish = <FlatButton label='Finalizar compra' style={ sty.finalize } onTouchTap={this.handleClick} />
      : finish = <h1 className={ styles.addItem }>Adicione um produto no carrinho para começar</h1>
    return (
      <div className={ styles.wrapper }>
        <img className={ styles.divider } src={Divider} />
        <div className={ styles.event }>
          { eventImgHolder }
        </div>
        { ProductList }
        <div className={ styles.action }>
          <img className={ styles.total } src={Total} />
          <hr className={ styles.line } />
          <h2 className={ styles.value }>R${this.state.total},00</h2>
          { finish }
          <img className={ styles.banner} src={Action} />
        </div>
        <CheckoutDialog
          props={this.state}
          products={products}
          order={order}
          style={{width: '100%'}}
          close={this.handleClose}
          handleSubmit={this.handleSubmit}
          handleName={this.handleName}
          handleEmail={this.handleEmail}
          handleFormName={this.handleFormName}
          handleFormDoc={this.handleFormDoc} />
      </div>
    );
  }
}

export default Shop;
