/*
 *
 * Store actions
 *
 */

import {
  FETCH_DESCRIPTION, SAVE_DESCRIPTION,
  FETCH_PRODUCTS, SAVE_PRODUCTS,
  FETCH_FOOTER, SAVE_FOOTER,
  CREATE_ORDER
} from './constants';

/**
 * Order
 */
export function postOrder(userInfo, cart) {
  return {
    type: CREATE_ORDER,
    payload: {userInfo, cart}
  }
}
/**
 * Description
 */
 export function fetchDescription() {
   return {
     type: FETCH_DESCRIPTION,
   };
 }

 export function saveDescription(description, eventImg) {
   return {
     type: SAVE_DESCRIPTION,
     payload: { description, eventImg }
   };
 }

 /**
  * Footer
  */
  export function fetchFooter() {
    console.log('returning');
    return {
      type: FETCH_FOOTER,
    };
  }

  export function saveFooter(text) {
    return {
      type: SAVE_FOOTER,
      payload: text
    };
  }

/**
 * Products
 */
export function fetchProducts() {
  return {
    type: FETCH_PRODUCTS,
  };
}

export function saveProducts(products) {
  return {
    type: SAVE_PRODUCTS,
    payload: products
  };
}
