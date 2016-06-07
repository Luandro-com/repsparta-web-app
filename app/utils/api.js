/**
 * API
 */
 import 'whatwg-fetch';
 const adminUrl = process.env.ADMINURL || require('../../config').adminUrl;
 const apiUrl = process.env.API || require('../../config').api;

export function paymentApi(data) {
  const { full_name, email } = data;
  console.log(data);
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
export function postsApi() {
  return fetch(`${adminUrl}/wp-json/wp/v2/posts`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

export function imageApi(mediaId) {
  return fetch(`${adminUrl}/wp-json/wp/v2/media/${mediaId}`)
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

export function completeOrderApi(data) {
  console.log(data);
  return fetch(`${apiUrl}/order_complete`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })

}

export function ordersApi(data) {
  console.log(data);
  let cart = [];
  data.payload.cart.map((item) => {
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
 });
 const { full_name, total, email } = data.payload;
 const first_name = full_name.split(' ')[0];
 const last_name = full_name.split(' ')[1];
 const formatedData = {
    order: {
     id: data.id,
     status: 'pending',
     total,
     payment_details: {
       method_id: 'pagseguro',
       method_title: 'PagSeguro',
       paid: false
     },
     billing_address: {
       first_name,
       last_name,
       email,
       country: "BR",
       persontype: "F",
       sex: false,
     },
     line_items: cart
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
