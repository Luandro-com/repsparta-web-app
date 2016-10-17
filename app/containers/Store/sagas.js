import { getData, saveData } from 'utils/localStorage';

import {
  FETCH_PRODUCTS,
  FETCH_CONTENT,
  START_PAYMENT,
  SUCCESS_PAYMENT,
} from './constants';
import {
  take,
  call,
  put,
} from 'redux-saga/effects';
import {
  saveProducts,
  saveContent,
  failPayment,
  openLightbox,
} from './actions';
import {
  orderNotesApi,
  ordersApi,
  paymentApi,
  productsApi,
  postsApi,
  imageApi,
  completeOrderApi,
} from '../../utils/api';
// All sagas to be loaded
export default [
  getProducts,
  getContent,
  startPayment,
  completePayment,
];

/**
 * Helpers
 */
function* getCache(key) {
  const cache = yield call(getData, key);
  if (cache !== null) {
    switch (key) {
      case 'posts':
        yield put(saveContent(JSON.parse(cache)));
        break;
      case 'products':
        yield put(saveProducts(JSON.parse(cache)));
        break;
      default:
        break;
    }
  }
}

function* setCache(key, data) {
  yield call(saveData, key, JSON.stringify(data));
}

/**
 * Complete payment
 */
export function* completePayment() {
  while (true) {
    const action = yield take(SUCCESS_PAYMENT);
    const order = yield call(completeOrderApi, action.payload);
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
    if (order.ok) {
      const noteData = {
        id: order.order_number,
        notes: {
          order_note: {
            note: action.payload.notes,
          },
        },
      };
      const { total, full_name, email, cart } = action.payload;
      const payData = {
        total,
        full_name,
        email,
        cart,
        ref: order.order_number,
      };
      yield call(orderNotesApi, noteData);
      const payment = yield call(paymentApi, payData);
      if (payment.ok) {
        yield put(openLightbox(payment.code, order.order_number));
      }
    } else {
      yield put(failPayment());
    }
  }
}
/**
 * Get products
 */
export function* getProducts() {
  while (true) {
    yield take(FETCH_PRODUCTS);
    const key = 'products';
    yield call(getCache, key);
    const products = yield call(productsApi);
    const data = products.products;
    if (data && data.length > 0) {
      yield call(setCache, key, data);
      yield put(saveProducts(data));
    }
  }
}
/**
 * Get content
 */
export function* getContent() {
  while (true) {
    yield take(FETCH_CONTENT);
    const key = 'posts';
    yield call(getCache, key);
    const content = yield call(postsApi);
    if (content && !content.fail) {
      const data = {};
      for (const item of content) {
        data[item.slug] = item.content.rendered;
        if (item.featured_media) {
          const img = yield call(imageApi, item.featured_media);
          if (img) {
            data[`${item.slug}Img`] = img.source_url;
          }
        }
      }
      yield call(setCache, key, data);
      yield put(saveContent(data));
    }
  }
}
