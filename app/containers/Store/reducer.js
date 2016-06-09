/*
 *
 * Store reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_PRODUCTS, SAVE_CONTENT, START_PAYMENT, FAIL_PAYMENT, CREATE_ORDER,
  LIGHTBOX_OPEN, LIGHTBOX_LOADED
} from './constants';

const initialState = fromJS({
  content: {
    headerImg: undefined,
    republicas: [],
    description: null,
    eventImg: null,
    footer: null,
  },
  products: [],
  order: {
    loading: false,
    error: false,
    lightboxLoaded: false,
    lightboxOpen: false,
    paymentCode: null,
    orderId: null,
  }
});
function extractContent(html) {
  const span= document.createElement('span');
  span.innerHTML= html;
  const imgs = span.getElementsByTagName('img');
  let srcList = [];
  for (var i = 0; i < imgs.length; i++) {
    srcList.push(imgs[i].src);
  }
  return srcList;
};
function storeReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_PRODUCTS:
      return state
        .set('products', action.payload);
    case SAVE_CONTENT:
      const reps = extractContent(action.payload.republicas);
      return state
        .setIn(['content', 'headerImg'], action.payload.headerImg)
        .setIn(['content', 'republicas'], reps)
        .setIn(['content', 'description'], action.payload.description)
        .setIn(['content', 'eventImg'], action.payload.eventImg)
        .setIn(['content', 'footer'], action.payload.footer)
    case START_PAYMENT:
      return state
        .setIn(['order', 'loading'], true)
        .setIn(['order', 'error'], false)
    case FAIL_PAYMENT:
      return state
        .setIn(['order', 'loading'], false)
        .setIn(['order', 'error'], true)
        .setIn(['order', 'lightboxOpen'], false)
        .setIn(['order', 'paymentCode'], null)
    case LIGHTBOX_LOADED:
      return state
        .setIn(['order', 'lightboxLoaded'], true)
    case LIGHTBOX_OPEN:
      return state
        .setIn(['order', 'lightboxOpen'], true)
        .setIn(['order', 'paymentCode'], action.payload.paymentCode)
        .setIn(['order', 'orderId'], action.payload.orderId)
    default:
      return state;
  }
}

export default storeReducer;
