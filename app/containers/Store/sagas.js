import 'whatwg-fetch';
import { FETCH_PRODUCTS, FETCH_DESCRIPTION, FETCH_FOOTER } from './constants';
import { take, call, put, select } from 'redux-saga/effects';
import { saveProducts, saveDescription, saveFooter } from './actions';
const url = process.env.URL || require('../../../config').url;
const descriptionPostId = process.env.DESCRIPTION || require('../../../config').description;
const footerPostId = process.env.FOOTER || require('../../../config').footer;
const apiUrl = process.env.API || require('../../../config').api;

// All sagas to be loaded
export default [
  getProducts,
  getDescription,
  getFooter,
];
/**
 * API
 */
function descriptionApi() {
  return fetch(`${url}/wp-json/wp/v2/posts/${descriptionPostId}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}
function eventImageApi(mediaId) {
  return fetch(`${url}/wp-json/wp/v2/media/${mediaId}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}
function footerApi() {
  return fetch(`${url}/wp-json/wp/v2/posts/${footerPostId}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

function productsApi() {
  return fetch(`${apiUrl}/products`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

function ordersApi() {
  return fetch(`${apiUrl}/order`)
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
      const img = yield call(eventImageApi, description.featured_media);
      if(img) {
        yield put(saveDescription(description.content.rendered, img.source_url));
      }
    }
  }
}
export function* getFooter() {
  while(true) {
    yield take(FETCH_FOOTER);
    const footer = yield call(footerApi);
    console.log(footer);
    if(footer) {
      yield put(saveFooter(footer));
    }
  }
}
