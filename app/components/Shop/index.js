/**
*
* Shop
*
*/

import React from 'react';
import 'whatwg-fetch';
import CPF from 'gerador-validador-cpf';

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
      state: '',
      city: '',
      street: '',
      neighborhood: '',
      total: 0,
      open: false,
      finished: false,
      stepIndex: 0,
      first_name_error: false,
      last_name_error: false,
      email_error: false,
      cpf_error: false,
      cep_error: false,
      phone_error: false,
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
    const {
      total, first_name, last_name, email, phone, number, cpf, cep, street, neighborhood, city, state,
      first_name_error, last_name_error, email_error, cpf_error, cep_error, phone_error
    } = this.state;
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
    const cleanCpf = cpf.replace(/\D/g, '');
    function checkErrors() {
      if(!first_name_error && !last_name_error && !email_error && !cpf_error && !cep_error && !phone_error) {
        return false
      } else {
        return true
      }
    }
    if(!checkErrors()) {
      postOrder({
          total,
          first_name,
          last_name,
          email,
          phone,
          number,
          cpf: cleanCpf,
          cep,
          street,
          state,
          city,
          neighborhood
        }, cart);
    }
  }

  handleCep = (e) => {
    const text = e.target.value;
    const cleaned = text.replace(/[^a-zA-Z0-9 ]/g, "");
    if(cleaned.length < 8) {
      this.setState({
        cep_error: true,
        cep: text
      })
    } else {
      this.setState({
        cep: text
      })
      fetch(`https://viacep.com.br/ws/${cleaned}/json/`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          cep_error: false,
          cep: json.cep,
          city: json.localidade,
          state: json.uf,
          neighborhood: json.bairro,
          number: json.complemento
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
  handleFirstName = (e) => {
    const text = e.target.value
    if(text.length < 2) {
      this.setState({
        first_name_error: true,
        first_name: text
      })
    } else {
      this.setState({
        first_name_error: false,
        first_name: text
      })
    }
  }
  handleLastName = (e) => {
    const text = e.target.value
    if(text.length < 2) {
      this.setState({
        last_name_error: true,
        last_name: text
      })
    } else {
      this.setState({
        last_name_error: false,
        last_name: text
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
  handlePhone = (e) => {
    const text = e.target.value;
    const cleaned = text.replace(/\D/g, '');
    if(cleaned.length < 10) {
      this.setState({
        phone_error: true,
        phone: text
      })
    } else {
      this.setState({
        phone_error: false,
        phone: text
      })
    }
  }
  handleNumber = (e) => {
    this.setState({
      number: e.target.value
    })
  }
  handleCpf = (e) => {
    const text = e.target.value
    const checked = CPF.validate(text);
    const formated = CPF.format(text);
    if(text.length < 11 || !checked) {
      this.setState({
        cpf_error: true,
        cpf: text
      })
    } else {
      this.setState({
        cpf_error: false,
        cpf: formated
      })
    }
  }

  handleNeighborhood = (e) => {
    this.setState({
      neighborhood: e.target.value
    })
  }
  handleStreet = (e) => {
    this.setState({
      street: e.target.value
    })
  }

  render() {
    const { total } = this.state;
    const { products, postOrder, eventImg } = this.props;
    let ProductList, eventImgHolder, finish;
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
    total > 0
      ? finish = <button className={ styles.button } onClick={this.handleClick}>Finalizar Compra</button>
      : finish = <h1 className={ styles.addItem }>Adicione um produto no carrinho para começar</h1>
    return (
      <div className={ styles.wrapper }>
        <img className={ styles.divider } src={Divider} />
        { eventImgHolder }
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
          handleNeighborhood={this.handleNeighborhood}
          handleStreet={this.handleStreet}/>
      </div>
    );
  }
}

export default Shop;
