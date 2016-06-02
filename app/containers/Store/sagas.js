import 'whatwg-fetch';
import { FETCH_PRODUCTS, FETCH_DESCRIPTION, FETCH_FOOTER, CREATE_ORDER } from './constants';
import { take, call, put, select } from 'redux-saga/effects';
import { saveProducts, saveDescription, saveFooter } from './actions';
const adminUrl = process.env.ADMINURL || require('../../../config').adminUrl;
const descriptionPostId = process.env.DESCRIPTION || require('../../../config').description;
const footerPostId = process.env.FOOTER || require('../../../config').footer;
const apiUrl = process.env.API || require('../../../config').api;

// All sagas to be loaded
export default [
  getProducts,
  getDescription,
  getFooter,
  createOrder
];
/**
 * API
 */
function descriptionApi() {
  return fetch(`${adminUrl}/wp-json/wp/v2/posts/${descriptionPostId}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}
function eventImageApi(mediaId) {
  return fetch(`${adminUrl}/wp-json/wp/v2/media/${mediaId}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}
function footerApi() {
  return fetch(`${adminUrl}/wp-json/wp/v2/posts/${footerPostId}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

function productsApi() {
  return fetch(`${apiUrl}/products`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

function ordersApi(data) {
  const { first_name, last_name, email, phone, street, city, state, cep, cpf, number} = data.userInfo;
  console.log(data.userInfo);
  let cart = [];
  data.cart.map((item) => {
    const { price, name, product_id, quantity, meta} = item;
    cart.push({
     id: product_id,
     subtotal: price,
     total: price,
     price,
     quantity,
     name,
     product_id,
     meta
   })
  })
  const formatedData = {
    order: {
     payment_details: {
       method_id: 'pagseguro',
       method_title: 'PagSeguro',
       paid: false
     },
     billing_address: {
       first_name,
       last_name,
       email,
       phone,
       address_1: street,
       city,
       state,
       postcode: cep,
       country: "BR",
       persontype: "F",
       cpf,
       sex: false,
       number,
      },
     line_items: cart
   }
  }
  console.log('BODY', JSON.stringify(formatedData));
  return fetch(`${apiUrl}/order`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formatedData)
  })
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

/**
 * SAGAS
 */
 export function* createOrder() {
   while(true) {
     const action = yield take(CREATE_ORDER);
     const order = yield call(ordersApi, action.payload);
     if(order.ok) {
      // window.location = `${adminUrl}/checkout/order-pay/${order.order_number}/?pay_for_order=true&key=${order.order_key}`;
     }
   }
 }
export function* getProducts() {
  while(true) {
    yield take(FETCH_PRODUCTS);
    const products = yield call(productsApi);
    if(products.products.length > 0) {
      yield put(saveProducts(products.products));
    }
  }
}
export function* getDescription() {
  while(true) {
    yield take(FETCH_DESCRIPTION);
    const description = yield call(descriptionApi);
    if(description) {
      const img = yield call(eventImageApi, description.featured_media);
      if(img) {
        yield put(saveDescription(description.content.rendered, img.source_url));
      }
    }
  }
}
export function* getFooter() {
  while(true) {
    yield take(FETCH_FOOTER);
    const footer = yield call(footerApi);
    console.log(footer);
    if(footer) {
      yield put(saveFooter(footer));
    }
  }
}
