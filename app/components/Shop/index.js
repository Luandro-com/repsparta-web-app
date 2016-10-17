/**
*
* Shop
*
*/

import React from 'react';
import 'whatwg-fetch';
// import capitalize from 'lodash/capitalize';

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
    // margin: '5% 0 10%',
    border: '1px solid #fff',
    padding: '20px 40px',
    height: 'auto',
    lineHeight: 'auto',
    color: '#fff',
  },
};

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedDescriptionImg: false,
      loadedProductImg: false,
      full_name: '',
      email: '',
      total: 0,
      open: false,
      full_name_error: false,
      email_error: false,
      numPeople: 0,
    };
  }

  componentDidUpdate(nextProps, nextState) {
    const { products } = this.props;
    const { numPeople } = this.state;
    if (nextProps.products && nextProps.products.length === products.length && nextState.numPeople === numPeople) {
      return;
    } else if (nextProps.products.length !== products.length) {
      products.map((item) => {
        this.setState({
          [`selected${item.id}`]: 1,
          [`counter${item.id}`]: 0,
        });
      });
    } else if (nextState.numPeople !== numPeople) {
      for (let i = 0; i < numPeople; i++) {
        this.setState({
          [`formName${i + 1}`]: '',
          [`formDoc${i + 1}`]: '',
        });
      }
    }
  }

  returnPrice(id) {
    return this.props.products
      .filter((item) => item.id === id)
      .map((res) => res.price);
  }

  handleImageLoad = (key) => {
    console.log('IMAGE LODEAD KEY: ', key);
    // const formatedKey = `loaded${capitalize(key)}Img`;
    // this.setState({
    //   [key]: !this.state[key],
    // });
  }

  handleCounterInc = (id) => {
    const price = Number(this.returnPrice(id));
    const product = this.props.products
      .filter((item) => item.id === id);
    console.log('STATE', this.state[`selected${id}`]);
    if (this.state[`selected${id}`] > 1 || this.state[`selected${id}`].length > 1) {
      const variation = product[0].variations.filter((item) => item.attributes[0].option === this.state[`selected${id}`]);
      if (this.state[`counter${id}`] < variation[0].stock_quantity) {
        this.setState({
          [`counter${id}`]: this.state[`counter${id}`] + 1,
          total: this.state.total + price,
          numPeople: this.state.numPeople + 1,
        });
      }
    } else {
      if (this.state[`counter${id}`] < product[0].stock_quantity) {
        this.setState({
          [`counter${id}`]: this.state[`counter${id}`] + 1,
          total: this.state.total + price,
          numPeople: this.state.numPeople + 1,
        });
      }
    }
  }

  handleCounterDec = (id) => {
    const price = this.returnPrice(id);
    if (this.state[`counter${id}`] > 0) {
      this.setState({
        [`counter${id}`]: this.state[`counter${id}`] - 1,
        total: this.state.total - price,
        numPeople: this.state.numPeople - 1,
      });
    }
  }

  handleSelectChange = (id, e, index, value) => {
    this.setState({
      [`selected${id}`]: value,
    });
  }

  handleClick = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  /**
   * Form controllers
   */
  handleSubmit = () => {
    const {
      total, full_name, email,
      full_name_error, email_error, cep_error, numPeople,
    } = this.state;
    const cart = [];
    const { products, startPayment } = this.props;
    products.map((item, key) => {
      const { id, title, price, variations } = item;
      if (this.state[`counter${id}`]) {
        // Get variations
        const variation = variations
        .filter((variation) => {
          return variation.attributes[0].option === this.state[`selected${id}`];
        });
        let variation_id;
        let meta;
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
        });
      }
    });
    // Get form data for each item in cart
    let notes = 'Lista: ';
    for (let i = 0; i < numPeople; i++) {
      notes += ' | ' + this.state[`formName${i+1}`] + ' - ' + this.state[`formDoc${i+1}`]
    }
    function checkErrors() {
      if (!full_name_error && !email_error && !(full_name.split(' ').length < 2) && !(email.split('').length < 5)) {
        return false;
      }
      return true;
    }
    console.log(notes);
    if (!checkErrors()) {
      startPayment({
        total,
        full_name,
        email,
        cart,
        notes,
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
    const text = e.target.value;
    function checkemail(input) {
      const filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (filter.test(input)) {
        return true;
      }
      return false;
    }
    const checked = checkemail(text);
    if (text.length < 2 || !checked) {
      this.setState({
        email_error: true,
        email: text,
      });
    } else {
      this.setState({
        email_error: false,
        email: text,
      });
    }
  }
  handleFormName = (id, e) => {
    this.setState({
      [`formName${id}`]: e.target.value,
    });
  }
  handleFormDoc = (id, e) => {
    this.setState({
      [`formDoc${id}`]: e.target.value,
    });
  }


  render() {
    const { total } = this.state;
    const { products, order, startPayment, eventImg } = this.props;
    const productList = () => {
      if (products && products.length > 0) {
        return (
          <div className={styles.products}>
            {products.map((item, key) => {
              const counter = this.state[`counter${item.id}`];
              const selected = this.state[`selected${item.id}`];
              return (
                <ProductItem
                  key={key} {...item}
                  inc={() => this.handleCounterInc(item.id)}
                  dec={() => this.handleCounterDec(item.id)}
                  change={() => this.handleSelectChange(item.id)}
                  imgLoad={this.handleImageLoad}
                  counter={counter}
                  selected={selected}
                />
            );
            })}
          </div>
        );
      }
      return <Loader color={'#000'} />;
    };
    const eventImgHolder = () => {
      if (eventImg !== null) {
        return <img height={255} alt="Evento" width={255} src={eventImg} />;
      }
      return <Loader color={'#000'} />;
    };
    const finish = () => {
      if (total > 0) {
        return (
          <div className={styles.button}>
            <FlatButton label="Finalizar compra" style={sty.finalize} onTouchTap={this.handleClick} />
          </div>
        );
      }
      return <h1 className={styles.addItem}>Adicione um produto no carrinho para começar</h1>;
    };
    return (
      <div className={styles.wrapper}>
        <img className={styles.divider} src={Divider} alt="" />
        <div className={styles.event}>
          {eventImgHolder()}
        </div>
        {productList()}
        <div className={styles.action}>
          <img className={styles.total} src={Total} alt="" />
          <hr className={styles.line} />
          <h2 className={styles.value}>R${this.state.total},00</h2>
          {finish()}
          <img className={styles.banner} src={Action} alt="" />
        </div>
        <CheckoutDialog
          props={this.state}
          products={products}
          order={order}
          style={{ width: '100%' }}
          close={this.handleClose}
          handleSubmit={this.handleSubmit}
          handleName={this.handleName}
          handleEmail={this.handleEmail}
          handleFormName={this.handleFormName}
          handleFormDoc={this.handleFormDoc}
        />
      </div>
    );
  }
}

export default Shop;
