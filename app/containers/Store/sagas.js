import {
  FETCH_PRODUCTS,
  FETCH_CONTENT,
  CREATE_ORDER,
  START_PAYMENT,
  FAIL_PAYMENT,
  SUCCESS_PAYMENT
} from './constants';
import {
  take,
  call,
  put,
  select,
  cps
} from 'redux-saga/effects';
import {
  saveProducts,
  saveContent,
  failPayment,
  openLightbox
} from './actions';
import {
  orderNotesApi,
  ordersApi,
  paymentApi,
  productsApi,
  postsApi,
  imageApi,
  completeOrderApi
} from '../../utils/api';
// All sagas to be loaded
export default [
  getProducts,
  getContent,
  startPayment,
  completePayment
];

/**
 * Complete payment
 */
export function* completePayment() {
  while(true) {
    const action = yield take(SUCCESS_PAYMENT);
    console.log(action.payload);
    const order = yield call(completeOrderApi, action.payload)
    console.log(order);
  }
}
/**
 * Start payment
 */
export function* startPayment() {
  while (true) {
    const action = yield take(START_PAYMENT);
    const order = yield call(ordersApi, action.payload);
    if(order.ok) {
      const noteData = {
        id: order.order_number,
        notes: {
          order_note: {
            note: 'Order ok!!!'
          }
        }
      }
      const { total, full_name, email, cart } = action.payload;
      const payData = {
        total,
        full_name,
        email,
        cart,
        ref: order.order_number
      }
      const note = yield call(orderNotesApi, noteData);
      const payment = yield call(paymentApi, payData);
      if(payment.ok) {
        yield put(openLightbox(payment.code, order.order_number));
      }
    } else {
      yield put(failPayment(payment));
    }
  }
}
/**
 * Get products
 */
export function* getProducts() {
  while (true) {
    yield take(FETCH_PRODUCTS);
    const products = yield call(productsApi);
    if (products.products.length > 0) {
      yield put(saveProducts(products.products));
    }
  }
}
/**
 * Get content
 */
export function* getContent() {
  while (true) {
    yield take(FETCH_CONTENT);
    const content = yield call(postsApi);
    if (content) {
      let data = {};
      for(let item of content) {
        data[item.slug] = item.content.rendered;
        if(item.featured_media) {
            const img = yield call(imageApi, item.featured_media);
            if (img) {
              data[`${item.slug}Img`] = img.source_url;
            }
        }
      }
      yield put(saveContent(data));
    }
  }
}
