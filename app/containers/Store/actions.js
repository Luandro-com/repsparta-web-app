/*
 *
 * Store actions
 *
 */

import {
  FETCH_DESCRIPTION, SAVE_DESCRIPTION,
  FETCH_PRODUCTS, SAVE_PRODUCTS,
  CREATE_ORDER
} from './constants';

/**
 * Order
 */
export function postOrder(info) {
  return {
    type: CREATE_ORDER,
    payload: info
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

 export function saveDescription(description) {
   return {
     type: SAVE_DESCRIPTION,
     payload: description
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
