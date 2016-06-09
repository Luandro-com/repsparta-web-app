/*
 *
 * Store actions
 *
 */

import {
  FETCH_CONTENT, SAVE_CONTENT,
  FETCH_PRODUCTS, SAVE_PRODUCTS,
  START_PAYMENT, FAIL_PAYMENT, CREATE_ORDER,
  LIGHTBOX_OPEN, LIGHTBOX_LOADED, SUCCESS_PAYMENT
} from './constants';
/**
 * Payment
 */
export const startPayment = (data) => ({
  type: START_PAYMENT,
  payload: data
});
export const failPayment = (err) => ({
  type: FAIL_PAYMENT,
  payload: err
});
export const lightboxLoaded = () => ({
  type: LIGHTBOX_LOADED
})
export const openLightbox = (paymentCode, orderId) => ({
  type: LIGHTBOX_OPEN,
  payload: { paymentCode, orderId }
})
/**
 * Order
 */
export const postOrder = (userInfo, cart) => ({
  type: CREATE_ORDER,
  payload: {userInfo, cart}
});
export const completeOrder = (data) => ({
  type: SUCCESS_PAYMENT,
  payload: data
})
/**
 * Content
 */
export const fetchContent = () => ({
    type: FETCH_CONTENT,
 });

export const saveContent = (data) => ({
   type: SAVE_CONTENT,
   payload: {
     headerImg: data.republicasImg,
     republicas: data.republicas,
     description: data.descricao ,
     eventImg: data.descricaoImg,
     footer: data.rodape }
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
