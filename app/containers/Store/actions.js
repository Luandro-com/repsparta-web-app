/*
 *
 * Store actions
 *
 */

import {
  FETCH_DESCRIPTION, SAVE_DESCRIPTION,
  FETCH_PRODUCTS, SAVE_PRODUCTS,
  FETCH_FOOTER, SAVE_FOOTER,
  START_PAYMENT, FAIL_PAYMENT, CREATE_ORDER
} from './constants';
/**
 * Payment
 */
export const startPayment = (userInfo, cart) => ({
  type: START_PAYMENT,
  payload: {userInfo, cart}
});
export const failPayment = (err) => ({
  type: FAIL_PAYMENT,
  payload: err
})
/**
 * Order
 */
export const postOrder = (userInfo, cart) => ({
  type: CREATE_ORDER,
  payload: {userInfo, cart}
});
/**
 * Description
 */
export const fetchDescription = () => ({
    type: FETCH_DESCRIPTION,
 });

export const saveDescription = (description, eventImg) => ({
   type: SAVE_DESCRIPTION,
   payload: { description, eventImg }
 });

 /**
  * Footer
  */
export const fetchFooter = () => ({
  type: FETCH_FOOTER,
});

export const saveFooter = (text) => ({
  type: SAVE_FOOTER,
  payload: text
});

/**
 * Products
 */
export const fetchProducts = () => ({
  type: FETCH_PRODUCTS
});

export const saveProducts = (products) => ({
  type: SAVE_PRODUCTS,
  payload: products
});
