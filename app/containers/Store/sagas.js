import {
  FETCH_PRODUCTS,
  FETCH_DESCRIPTION,
  FETCH_FOOTER,
  CREATE_ORDER,
  START_PAYMENT,
  FAIL_PAYMENT
} from './constants';
import {
  take,
  call,
  put,
  select
} from 'redux-saga/effects';
import {
  saveProducts,
  saveDescription,
  saveFooter,
  failPayment
} from './actions';
import {
  paymentApi,
  productsApi,
  descriptionApi,
  eventImageApi,
  footerApi
} from '../../utils/api';

// All sagas to be loaded
export default [
  getProducts,
  getDescription,
  getFooter,
  createPayment
];

/**
 * SAGAS
 */
function lightBox(code) {
  return PagSeguroLightbox({
    code,
  }, {
    success: (transactionCode) => {
      alert("success - " + transactionCode);
      createOrder(transactionCode);
    },
    abort: () => {
      console.log('ABORTED');
    }
  })
}
export function* createOrder(code) {
  const order = yield call(ordersApi, code);
  console.log(order);
}
export function* createPayment() {
  while (true) {
    const action = yield take(START_PAYMENT);
    console.log(action.payload);
    const payment = yield call(paymentApi, action.payload)
    console.log(payment);
    if (payment.ok) {
      const lightbox = yield call(lightBox, payment.code);
      if(!lightbox) {
        yield put(failPayment(payment));
      }
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
export function* getDescription() {
  while (true) {
    yield take(FETCH_DESCRIPTION);
    const description = yield call(descriptionApi);
    if (description) {
      const img = yield call(eventImageApi, description.featured_media);
      if (img) {
        yield put(saveDescription(description.content.rendered, img.source_url));
      }
    }
  }
}
export function* getFooter() {
  while (true) {
    yield take(FETCH_FOOTER);
    const footer = yield call(footerApi);
    if (footer) {
      yield put(saveFooter(footer.content.rendered));
    }
  }
}
