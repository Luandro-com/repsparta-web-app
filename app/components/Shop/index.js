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
import Action from './garanta-ja.png';
import Total from './total.png';

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      number: '',
      cpf: '',
      cep: '',
      state: 'MG',
      city: 'Viçosa',
      street: '',
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

  /**
   * Form controllers
   */
  handleSubmit = () => {
    const { total, first_name, last_name, email, phone, number, cpf, cep, street } = this.state;
    let cart = [];
    const { products, postOrder } = this.props;
    products.map((item, key) => {
      const { id, title, price, } = item;
      if(this.state[`counter${id}`]) {
        cart.push({
          name: title,
          price,
          product_id: id,
          quantity: this.state[`counter${id}`],
          meta: [{
            key: "republica",
            label: "República",
            value: this.state[`selected${id}`]
          }]
        })
      }
    });

    console.log(cart);
    postOrder({
        total,
        first_name,
        last_name,
        email,
        phone,
        number,
        cpf,
        cep,
        street
      }, cart);

  }

  handleCep = (e) => {
    this.setState({
      cep: e.target.value
    })
  }
  handleFirstName = (e) => {
    this.setState({
      first_name: e.target.value
    })
  }
  handleLastName = (e) => {
    this.setState({
      last_name: e.target.value
    })
  }
  handleEmail = (e) => {
    function checkemail(){
      var str=e.target.value
      var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      if (filter.test(str))
        return true
      else {
        return false
      }
    }

    this.setState({
      email: e.target.value
    })
  }
  handlePhone = (e) => {
    this.setState({
      phone: e.target.value
    })
  }
  handleNumber = (e) => {
    this.setState({
      number: e.target.value
    })
  }
  handleCpf = (e) => {
    this.setState({
      cpf: e.target.value
    })
  }
  handleStreet = (e) => {
    this.setState({
      street: e.target.value
    })
  }

  render() {
    const { products, postOrder, eventImg } = this.props;
    let ProductList, eventImgHolder;
    eventImg
      ? eventImgHolder = <img className={ styles.event } src={eventImg} />
      : eventImgHolder = <Loader />
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
        { eventImgHolder }
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
          products={products}
          style={{width: '100%'}}
          close={this.handleClose}
          handleNext={this.handleNext}
          handlePrev={this.handlePrev}
          handleSubmit={this.handleSubmit}
          handleCep={this.handleCep}
          handleCpf={this.handleCpf}
          handleFirstName={this.handleFirstName}
          handleLastName={this.handleLastName}
          handlePhone={this.handlePhone}
          handleNumber={this.handleNumber}
          handleEmail={this.handleEmail}
          handleStreet={this.handleStreet}/>
      </div>
    );
  }
}

export default Shop;
