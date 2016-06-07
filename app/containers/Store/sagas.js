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
  createPayment,
];

/**
 * SAGAS
 */
export function* completePayment() {
  while(true) {
    const action = yield take(SUCCESS_PAYMENT);
    console.log(action.payload);
    const order = yield call(completeOrderApi, action.payload)
    console.log(order);
  }
}
export function* createPayment() {
  while (true) {
    const action = yield take(START_PAYMENT);
    console.log(action.payload);
    const payment = yield call(paymentApi, action.payload)
    console.log(payment);
    if (payment.ok) {
      // const { total, full_name, email } = action.payload.paymentInfo;
      const data = {
        id: payment.code,
        payload: action.payload
      }
      const order = yield call(ordersApi, data)
      console.log('order: ', order);
      yield put(openLightbox(payment.code));
    } else {
      yield put(failPayment(payment));
    }
  }
}
export function* getProducts() {
  while (true) {
    yield take(FETCH_PRODUCTS);
    const products = yield call(productsApi);
    if (products.products.length > 0) {
      yield put(saveProducts(products.products));
    }
  }
}
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
