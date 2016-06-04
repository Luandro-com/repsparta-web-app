/**
 * API
 */
 import 'whatwg-fetch';
 const adminUrl = process.env.ADMINURL || require('../../config').adminUrl;
 const descriptionPostId = process.env.DESCRIPTION || require('../../config').description;
 const footerPostId = process.env.FOOTER || require('../../config').footer;
 const apiUrl = process.env.API || require('../../config').api;

export function paymentApi(data) {
  const { full_name, email } = data.userInfo;
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
    full_name,
    email,
    cart
  };
  JSON.stringify(formatedData)
  return fetch(`${apiUrl}/payment`, {
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
export function descriptionApi() {
  return fetch(`${adminUrl}/wp-json/wp/v2/posts/${descriptionPostId}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}
export function eventImageApi(mediaId) {
  return fetch(`${adminUrl}/wp-json/wp/v2/media/${mediaId}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}
export function footerApi() {
  return fetch(`${adminUrl}/wp-json/wp/v2/posts/${footerPostId}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

export function productsApi() {
  return fetch(`${apiUrl}/products`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

export function ordersApi(data) {
  const { full_name, last_name, email, phone, street, city, state, cep, cpf, number, neighborhood} = data.userInfo;
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
       full_name,
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
     line_items: cart,
     customer: {
      email,
      full_name,
      last_name,
      billing_address: {
        full_name,
        last_name,
        address_1: street,
        city,
        state,
        postcode: cep,
        country: "BR",
        email,
        phone,
        persontype: "F",
        cpf,
        sex: false,
        number,
        neighborhood
      }
    }
   }
  }
  console.log('BODY', formatedData);
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
