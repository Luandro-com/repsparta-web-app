/**
 * API
 */
 import 'whatwg-fetch';
 const adminUrl = process.env.ADMINURL || require('../../config').adminUrl;
 const apiUrl = process.env.API || require('../../config').api;

export function paymentApi(data) {
  const { full_name, email } = data;
  let cart = [];
  data.cart.map((item) => {
    const { total, price, name, product_id, quantity, meta} = item;
    cart.push({
     id: product_id,
     subtotal: total,
     total: total,
     price,
     quantity,
     name,
   })
  })
  const formatedData = {
    full_name,
    email,
    cart
  };
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

export function postApi(id) {
  return fetch(`${adminUrl}/wp-json/wp/v2/posts/${id}`)
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
  return fetch(`${apiUrl}/payment_success`, {
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
/**
 * Orders API
 */
export function ordersApi(data) {
  let cart = [];
  data.cart.map((item) => {
    const { product_id, variation_id, quantity, meta } = item;

    let id;
    variation_id
      ? id = variation_id
      : id = product_id

    cart.push({
       product_id: id,
       quantity,
       variations: {
         [meta.key]: meta.value
       }

     })
  });

  const { full_name, total, email } = data;
  const first_name = full_name.split(' ')[0];
  const last_name = full_name.split(' ')[1];
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
        country: "BR",
      },
      line_items: cart
    }
  }
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
 * orderNotesApi
 */
export function orderNotesApi(data) {
  return fetch(`${apiUrl}/order_notes`, {
    method: 'POST',
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
