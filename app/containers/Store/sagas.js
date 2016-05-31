import 'whatwg-fetch';
import { FETCH_PRODUCTS, FETCH_DESCRIPTION } from './constants';
import { take, call, put, select } from 'redux-saga/effects';
import { saveProducts, saveDescription } from './actions';
const url = process.env.URL || require('../../../config').url;
const descriptionPageId = process.env.DESCRIPTION || require('../../../config').description;
// All sagas to be loaded
export default [
  getProducts,
  getDescription,
];
/**
 * API
 */
function descriptionApi() {
  return fetch(`${url}/wp-json/wp/v2/pages/${descriptionPageId}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

function productsApi() {
  return fetch('/api/products')
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

/**
 * SAGAS
 */
export function* getProducts() {
  while(true) {
    yield take(FETCH_PRODUCTS);
    const products = yield call(productsApi);
    if(products.products.length > 0) {
      yield put(saveProducts(products.products));
    }
  }
}
export function* getDescription() {
  while(true) {
    yield take(FETCH_DESCRIPTION);
    const description = yield call(descriptionApi);
    if(description) {
      yield put(saveDescription(description.content.rendered))
    }
  }
}
