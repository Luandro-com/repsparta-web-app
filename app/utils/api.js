/**
 * API
 */
import 'whatwg-fetch';
import config from '../../config';
const adminUrl = process.env.ADMINURL || config.adminUrl;
const apiUrl = process.env.API || config.api;

export function paymentApi(data) {
  const { full_name, email, ref } = data;
  const cart = [];
  data.cart.map((item) => {
    const { total, price, name, product_id, quantity } = item;
    cart.push({
      id: product_id,
      subtotal: total,
      total,
      price,
      quantity,
      name,
    });
  });
  const formatedData = {
    ref,
    full_name,
    email,
    cart,
  };
  return fetch(`${apiUrl}/payments`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatedData),
  })
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
    return {
      fail: true,
      err,
    };
  });
}

/**
 * All Posts
 */
export function postsApi() {
  return fetch(`${adminUrl}/wp-json/wp/v2/posts`)
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
    return {
      fail: true,
      err,
    };
  });
}

/**
 * Specific posts with ID
 */
export function postApi(id) {
  return fetch(`${adminUrl}/wp-json/wp/v2/posts/${id}`)
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
    return {
      fail: true,
      err,
    };
  });
}

/**
 * Specific media with ID
 */
export function imageApi(mediaId) {
  return fetch(`${adminUrl}/wp-json/wp/v2/media/${mediaId}`)
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
    return {
      fail: true,
      err,
    };
  });
}

/**
 * All products
 */
export function productsApi() {
  return fetch(`${apiUrl}/products`)
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
    return {
      fail: true,
      err,
    };
  });
}

export function completeOrderApi(data) {
  return fetch(`${apiUrl}/payments/success`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
    return {
      fail: true,
      err,
    };
  });
}
/**
 * Orders API
 */
export function ordersApi(data) {
  const cart = [];
  data.cart.map((item) => {
    const { product_id, variation_id, quantity, meta } = item;
    let id;
    variation_id ? id = variation_id : id = product_id;

    cart.push({
      product_id: id,
      quantity,
      variations: {
        [meta.key]: meta.value,
      },
    });
  });

  const { full_name, email } = data;
  const first_name = full_name.split(' ')[0];
  const last_name = full_name.split(' ')[1];
  const formatedData = {
    order: {
      payment_details: {
        method_id: 'pagseguro',
        method_title: 'PagSeguro',
        paid: false,
      },
      billing_address: {
        first_name,
        last_name,
        email,
        country: 'BR',
      },
      line_items: cart,
    },
  };

  return fetch(`${apiUrl}/orders`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatedData),
  })
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
    return {
      fail: true,
      err,
    };
  });
}

/**
 * orderNotesApi
 */
export function orderNotesApi(data) {
  return fetch(`${apiUrl}/orders/notes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
    return {
      fail: true,
      err,
    };
  });
}
